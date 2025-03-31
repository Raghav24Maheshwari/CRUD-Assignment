import { IsInt, IsString, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
//   @IsInt()
//   @Type(() => Number)  // ✅ Ensures userId is converted to a number
//   userId: number;

  @IsString()
  name: string;

  @IsInt()
  @IsPositive()  // ✅ Ensures age is a positive integer
  age: number;
}
