import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import * as fs from 'fs/promises';
import * as path from 'path';

const USERS_FILE_PATH = path.join(__dirname, '../../users.json');

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
  async saveUser(userData: { username: string; password: string }) {
    try {
      let users = [];
      try {
        const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        users = JSON.parse(data);
        for (const user of users) {
          if (user.username === userData.username) {
            if (user.password !== userData.password) {
              return;
            } else {
              return;
            }
          }
        }
        users.push(userData);
        await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
    } catch (error) {
      throw new Error('Failed to save user data');
    }
  }
}
