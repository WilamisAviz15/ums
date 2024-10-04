import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { UserRoleService } from './users-roles.service';
import { UsersRolesCreateDto } from './dto/create-users-roles.dto';
import { UsersRolesUpdateDto } from './dto/update-users-roles.dto';

@Controller('users-roles')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Get(':userId')
  findUserRolesByUserId(@Param('userId') userId?: string) {
    return this.service.getUsersRolesByUserId(+userId);
  }

  @Post('')
  create(@Body() createUserRequest: UsersRolesCreateDto) {
    return this.service.create(createUserRequest);
  }

  @Put(':userId')
  async update(@Param('userId', ParseIntPipe) userId: number, @Body() data: UsersRolesUpdateDto[]) {
    return this.service.update(userId, data);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
