import * as fs from 'fs';
import * as path from 'path';

const DB_FILE = path.resolve(process.cwd(), 'src/db/db.json');
interface User {
  userId: number;
  age: number;
  name: string;
}

export const readDB = (): User[] => {
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