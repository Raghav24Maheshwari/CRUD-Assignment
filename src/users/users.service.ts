import { Injectable, NotFoundException } from '@nestjs/common';
import { readDB } from 'src/utils/file';
import { writeDB } from 'src/utils/file';
import { User } from 'src/interfaces/users';

@Injectable()
export class UsersService {

  create(userDto: { name: string; age: number }): User {
    const users = readDB();
    const newUser: User = {
      userId: users.length > 0 ? users[users.length - 1].userId + 1 : 1,
      ...userDto,
    };
    users.push(newUser);
    writeDB(users);
    return newUser;
  }

  findAll(): User[] {
    return readDB();
  }

  findOne(userId: number): User | null {
    const user = readDB().find(user => user.userId === userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  update(userId: number, userDto: { name?: string; age?: number }): User | null {
    const users = readDB();
    const index = users.findIndex(user => user.userId === userId);
    if (index === -1) throw new NotFoundException(`User with ID ${userId} not found`);

    users[index] = { ...users[index], ...userDto };
    writeDB(users);
    return users[index];
  }

  remove(userId: number): boolean {
    let users = readDB();
    const filteredUsers = users.filter(user => user.userId !== userId);

    if (filteredUsers.length === users.length) throw new NotFoundException(`User with ID ${userId} not found`);;

    writeDB(filteredUsers);
    return true;
  }
}
