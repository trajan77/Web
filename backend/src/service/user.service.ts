import { Provide } from '@midwayjs/decorator';
import * as fs from 'fs/promises';
import * as path from 'path';

const USERS_FILE_PATH = path.join(__dirname, '../db/user.json');

@Provide()
export class UserService {
  async saveUser(userData: { username: string; password: string }) {
    console.log(USERS_FILE_PATH);
    try {
      let users = [];
      try {
        const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        users = JSON.parse(data);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
      users.push(userData);
      await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
    } catch (error) {
      throw new Error('Failed to save user data');
    }
  }
}
