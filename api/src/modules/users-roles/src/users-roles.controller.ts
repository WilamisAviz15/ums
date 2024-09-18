import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { UserRoleService } from './users-roles.service';

@Controller()
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Get('users-roles/:userId')
  findUserRolesByUserId(@Param('userId') userId?: string) {
    return this.service.getUsersRolesByUserId(+userId);
  }
}
