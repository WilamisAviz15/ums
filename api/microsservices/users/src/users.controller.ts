import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @EventPattern('user_created')
  handleUserCreated(data: any) {
    this.service.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.service.getUsers();
  }
}
