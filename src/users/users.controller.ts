import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/interfaces/users';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { badRequest, deleteMessage, deleteSummary, getAllMessage, getAllSummary, getSummary, notFound, okPost, postSummary, updateMessage, updateSummary } from 'src/utils/constants';
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}


@ApiOperation({ summary: postSummary })
@ApiResponse({ status: HttpStatus.OK, description: okPost })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: badRequest })
@ApiBody({ type: CreateUserDto }) 
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: getAllSummary })
  @ApiResponse({ status: HttpStatus.OK, description: getAllMessage })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @ApiOperation({ summary: getSummary })
  @ApiResponse({ status: HttpStatus.OK, description: getAllMessage })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: notFound })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }
  
  @ApiOperation({ summary: updateSummary })
  @ApiResponse({ status: HttpStatus.OK, description: updateMessage })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: notFound })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: deleteSummary })
  @ApiResponse({ status: HttpStatus.OK, description: deleteMessage })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: notFound })
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

}
