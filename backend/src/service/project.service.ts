import { Provide } from '@midwayjs/core';
import * as util from 'node:util';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata');
const getAsync = util.promisify(db.get.bind(db));
const runAsync = util.promisify(db.run.bind(db));
const allAsync = util.promisify(db.all.bind(db));

@Provide()
export class ProjectService {
  async createProject(userData: { name: Text; teamID: number }) {
    try {
      await runAsync(
        'INSERT INTO projects (project_name, team_id) VALUES (?, ?)',
        [userData.name, userData.teamID]
      );
      const lastInsertRow = await getAsync('SELECT last_insert_rowid() as id');
      const projectId = lastInsertRow.id;
      await runAsync(
        'INSERT INTO project_assignments (project_id, team_id) VALUES (?, ?)',
        [projectId, userData.teamID]
      );
      return true;
    } catch (error) {
      throw new Error('Failed to query or insert user data');
    }
  }
  async getProjects(userTeam: number): Promise<any> {
    const projects = await allAsync(
      `SELECT *
         FROM project_assignments pa
         JOIN projects p
         ON pa.project_id = p.project_id
         WHERE pa.team_id = ?`,
      [userTeam]
    );
    return projects.map(project => project);
  }
  async addTask(taskData: {
    projectId: number;
    taskName: Text;
    taskData: Text;
    dueDate: Text;
  }) {
    try {
      await runAsync(
        'INSERT INTO tasks (  project_id,  task_name,  task_data, due_date,statues) VALUES (?, ?, ?,?,0)',
        [
          taskData.projectId,
          taskData.taskName,
          taskData.taskData,
          taskData.dueDate,
        ]
      );
      return true;
    } catch (error) {
      throw new Error('Failed to query or insert user data');
    }
  }
  async getTasks(projectID: number): Promise<any> {
    const tasks = await allAsync('SELECT * FROM tasks WHERE project_id = ?', [
      projectID,
    ]);
    return tasks.map(task => task);
  }
  async delProject(projectData: { projectID: number }): Promise<any> {
    try {
      await runAsync('DELETE FROM projects where (project_id) = ?', [
        projectData.projectID,
      ]);
      const tasks = await allAsync('SELECT * FROM tasks WHERE project_id = ?', [
        projectData.projectID,
      ]);
      for (const task of tasks) {
        await runAsync('DELETE FROM task_comments where (task_id) = ?', [
          task.task_id,
        ]);
      }
      await runAsync('DELETE FROM tasks where (project_id) = ?', [
        projectData.projectID,
      ]);
      return true;
    } catch (error) {
      console.error('Failed to create team:', error);
      throw new Error('Failed to create team');
    }
  }
  async taskNext(taskData: { taskID: number }): Promise<any> {
    const status = await getAsync(
      'SELECT statues FROM tasks WHERE task_id = ?',
      [taskData.taskID]
    );
    if (status.statues === 2) {
      await runAsync('DELETE FROM task_comments where (task_id) = ?', [
        taskData.taskID,
      ]);
      await runAsync('DELETE FROM tasks where (task_id) = ?', [
        taskData.taskID,
      ]);
    } else {
      await runAsync('UPDATE tasks SET statues = ? WHERE task_id = ?', [
        status.statues + 1,
        taskData.taskID,
      ]);
    }
    return true;
  }
  async taskPrev(taskData: { taskID: number }): Promise<any> {
    const status = await getAsync(
      'SELECT statues FROM tasks WHERE task_id = ?',
      [taskData.taskID]
    );
    await runAsync('UPDATE tasks SET statues = ? WHERE task_id = ?', [
      status.statues - 1,
      taskData.taskID,
    ]);
    return true;
  }
  async taskComment(taskData: {
    comment: Text;
    taskID: number;
    userName: Text;
  }): Promise<any> {
    await runAsync(
      'INSERT INTO task_comments (  comment_text,  task_id,  user_name) VALUES (?, ?, ?)',
      [taskData.comment, taskData.taskID, taskData.userName]
    );
    return true;
  }
  async getComments(taskID: number): Promise<any> {
    const comments = await allAsync(
      'SELECT * FROM task_comments WHERE task_id = ?',
      [taskID]
    );
    return comments.map(comment => comment);
  }
}
