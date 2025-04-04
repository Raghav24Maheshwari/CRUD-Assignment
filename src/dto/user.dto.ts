import { IsInt, IsString, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
//   @IsInt()
//   @Type(() => Number)  
//   userId: number;
@ApiProperty({ example: 'A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 23 })
  @IsInt()
  @IsPositive() 
  age: number;
}
