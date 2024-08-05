import { Provide } from '@midwayjs/core';
import * as util from 'node:util';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata');

@Provide()
export class TeamService {
  getAsync = util.promisify(db.get.bind(db));
  runAsync = util.promisify(db.run.bind(db));

  async createTeam(teamData: { username: Text; team: Text; introduce: Text }) {
    try {
      const user = await this.getAsync(
        'SELECT * FROM user WHERE username = ?',
        [teamData.username]
      );
      await this.runAsync(
        'INSERT INTO team (team_name, introduce) VALUES (?, ?)',
        [teamData.team, teamData.introduce]
      );
      const teamId = db.lastID;
      await this.runAsync(
        'INSERT INTO team_members (user_id, team_id) VALUES (?, ?)',
        [user.user_id, teamId]
      );
      return { success: true, team: { id: teamId, ...teamData } };
    } catch (error) {
      console.error('Failed to create team:', error);
      throw new Error('Failed to create team');
    }
  }
}
