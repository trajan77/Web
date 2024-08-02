import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import * as util from 'node:util';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata');

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async login(userData) {
    const getAsync = util.promisify(db.get.bind(db));
    const runAsync = util.promisify(db.run.bind(db));
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
}
