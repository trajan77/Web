import { Provide } from '@midwayjs/core';
import * as util from 'node:util';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata');
const getAsync = util.promisify(db.get.bind(db));
const runAsync = util.promisify(db.run.bind(db));

@Provide()
export class UserService {
  async login(userData: { username: Text; password: Text }) {
    try {
      const row = await getAsync('SELECT * FROM user WHERE username = ?', [
        userData.username,
      ]);

      if (!row) {
        await runAsync('INSERT INTO user (username, password) VALUES (?, ?)', [
          userData.username,
          userData.password,
        ]);
        return true;
      }
      return row.password === userData.password;
    } catch (error) {
      throw new Error('Failed to query or insert user data');
    }
  }

  async getUserTeam(username: Text) {
    try {
      const user = await getAsync('SELECT * FROM user WHERE username = ?', [
        username,
      ]);
      const row = await getAsync(
        'SELECT * FROM team_members WHERE user_id = ?',
        [user.user_id]
      );
      if (!row) {
        return 0;
      }
      return row.team_id;
    } catch (error) {
      console.error('Failed to retrieve user team:', error);
      throw new Error('Failed to retrieve user team');
    }
  }
}
