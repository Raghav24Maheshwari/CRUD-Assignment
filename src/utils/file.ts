import * as fs from 'fs';
import * as path from 'path';
const DB_FILE = path.resolve(__dirname, '../../db/db.json');
console.log(DB_FILE,"12345678")
interface User {
  userId: number;
  age: number;
  name: string;
}

export const readDB = (): User[] => {
  console.log(DB_FILE,"12345678")
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error: any) {
    console.error('Error reading database:', error.message);
    return [];
  }
}


export const writeDB = (users:User[]) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
  }