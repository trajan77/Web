// db.ts

interface User {
  username: string;
  password: string;
}

class Database {
  private users: User[];

  constructor() {
    this.users = [];
  }

  add(username: string, password: string): void {
    // 在真实应用中，这里应该加密密码后再存储
    const newUser: User = { username, password };
    this.users.push(newUser);
    console.log(`User ${username} added to the database.`);
  }

  getUser(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
}

// 创建一个数据库实例
const db = new Database();

export default db;
