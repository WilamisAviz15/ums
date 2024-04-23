import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  createUser(@Body() createUserRequest: any) {
    this.appService.createUser(createUserRequest);
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }
}
