import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

const DB_FILE = 'db.json';

export interface User {
  userId: number;
  name: string;
  age: number;
}

@Injectable()
export class UsersService {
  private readDB(): User[] {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  private writeDB(users: User[]): void {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
  }

  create(userDto: { name: string; age: number }): User {
    const users = this.readDB();
    const newUser: User = {
      userId: users.length > 0 ? users[users.length - 1].userId + 1 : 1,
      ...userDto,
    };
    users.push(newUser);
    this.writeDB(users);
    return newUser;
  }

  findAll(): User[] {
    return this.readDB();
  }

  findOne(userId: number): User | null {
    const user = this.readDB().find(user => user.userId === userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  update(userId: number, userDto: { name?: string; age?: number }): User | null {
    const users = this.readDB();
    const index = users.findIndex(user => user.userId === userId);
    if (index === -1) throw new NotFoundException(`User with ID ${userId} not found`);

    users[index] = { ...users[index], ...userDto };
    this.writeDB(users);
    return users[index];
  }

  remove(userId: number): boolean {
    let users = this.readDB();
    const filteredUsers = users.filter(user => user.userId !== userId);

    if (filteredUsers.length === users.length) throw new NotFoundException(`User with ID ${userId} not found`);;

    this.writeDB(filteredUsers);
    return true;
  }
}
