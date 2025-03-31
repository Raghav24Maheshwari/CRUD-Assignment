import { Module } from '@nestjs/common';
import { UsersController } from './app.controller';
import { UsersService } from './app.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
