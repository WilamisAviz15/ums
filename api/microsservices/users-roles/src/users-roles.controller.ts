import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UsersRolesService } from './users-roles.service';
import { UserRoleInterface } from './interfaces/user-role.interface';
import { UsersRolesCreateDto } from './dto/create-users-roles.dto';
import { UsersRolesUpdateDto } from './dto/update-users-roles.dto';

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly service: UsersRolesService) {}

  @Get(':userId')
  async findOne(@Param('userId') userId?: string): Promise<UserRoleInterface[]> {
    return await this.service.findOneByUserId(+userId);
  }

  @Post()
  async create(@Body() data: UsersRolesCreateDto[]): Promise<{ userRoles: UserRoleInterface[]; message: string }> {
    return await this.service.create(data);
  }

  @Put(':userId')
  async update(@Param('userId', ParseIntPipe) userId: number, @Body() data: UsersRolesUpdateDto[]) {
    return await this.service.update(data, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
