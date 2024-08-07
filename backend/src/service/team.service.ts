import { Provide } from '@midwayjs/core';
import * as util from 'node:util';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata');
const getAsync = util.promisify(db.get.bind(db));
const runAsync = util.promisify(db.run.bind(db));
const allAsync = util.promisify(db.all.bind(db));

@Provide()
export class TeamService {
  async createTeam(teamData: { user: Text; team: Text; intro: Text }) {
    try {
      const row = await getAsync('SELECT * FROM user WHERE username = ?', [
        teamData.user,
      ]);
      await runAsync(
        'INSERT INTO team (team_name, introduce, leader) VALUES (?, ?, ?)',
        [teamData.team, teamData.intro, row.user_id]
      );
      const lastInsertRow = await getAsync('SELECT last_insert_rowid() as id');
      const teamId = lastInsertRow.id;
      await runAsync(
        'INSERT INTO team_members (user_id, team_id) VALUES (?, ?)',
        [row.user_id, teamId]
      );
      return { success: true, team: { id: teamId, ...teamData } };
    } catch (error) {
      console.error('Failed to create team:', error);
      throw new Error('Failed to create team');
    }
  }
  async getUserTeamName(userTeam: number): Promise<any> {
    try {
      const team = await getAsync('SELECT * FROM team WHERE team_id = ?', [
        userTeam,
      ]);
      return { name: team.team_name, intro: team.introduce };
    } catch (error) {
      throw new Error('Failed to get team_name');
    }
  }
  async getMembers(userTeam: number): Promise<any> {
    const members = await allAsync(
      `SELECT u.username
         FROM team_members tm
         JOIN user u
         ON tm.user_id = u.user_id
         WHERE tm.team_id = ?`,
      [userTeam]
    );
    return members.map(member => member.username);
  }
  async invite(ID: { teamID: number; name: Text }): Promise<any> {
    try {
      const userID = await getAsync('SELECT * FROM user WHERE username = ?', [
        ID.name,
      ]);
      console.log(userID);
      await runAsync(
        'INSERT INTO team_members (user_id, team_id) VALUES (?, ?)',
        [userID.user_id, ID.teamID]
      );
      return true;
    } catch (error) {
      console.error('Failed to create team:', error);
      throw new Error('Failed to create team');
    }
  }
}
