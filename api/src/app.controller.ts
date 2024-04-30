import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { AppService } from './app.service';
import { UserUpdateDto } from './modules/users/dto/update-user.dto';
import { UserJwtInterface } from './authentication/interfaces/user-jwt.interface';
import { AuthUser } from './shared/decorators/user.decorator';
import { RoleInterface } from './modules/roles/interfaces/role.interface';
import { RoleUpdateDto } from './modules/roles/dto/update-role.dto';
import { MenuInterface } from './modules/menus/interfaces/menu.interface';
import { MenusGroupUpdateDto } from './modules/menus-groups/dto/update-menus-group.dto';
import { MenusGroupInterface } from './modules/menus-groups/interfaces/menus-group.interface';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('users')
  createUser(@Body() createUserRequest: any) {
    return this.service.createUser(createUserRequest);
  }

  @Get('users')
  getUsers() {
    return this.service.getUsers();
  }

  @Put('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
    @AuthUser() user: UserJwtInterface,
  ) {
    this.service.updateUser(id, data, user);
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.service.deleteUser(+id);
  }

  @Get('roles')
  getRoles() {
    return this.service.getRoles();
  }

  @Post('roles')
  createRoles(@Body() data: RoleInterface) {
    return this.service.createRole(data);
  }

  @Put('roles/:id')
  async updateRoles(
    @Body() data: RoleUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.updateRole(data, id);
  }

  @Delete('roles/:id')
  removeRole(@Param('id') id: string) {
    return this.service.deleteRole(+id);
  }

  @Get('actions')
  getActions() {
    return this.service.getActions();
  }

  @Get('menus-groups')
  getMenusGroups() {
    return this.service.getMenusGroups();
  }

  @Post('menus-groups')
  createMenuGroup(@Body() data: MenusGroupInterface) {
    return this.service.createMenuGroup(data);
  }

  @Put('menus-groups/:id')
  async updateMenuGroup(
    @Body() data: MenusGroupUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.updateMenuGroup(data, id);
  }

  @Delete('menus-groups/:id')
  removeMenuGroup(@Param('id') id: string) {
    return this.service.deleteMenuGroup(+id);
  }

  @Get('menus')
  getMenus() {
    return this.service.getMenus();
  }

  @Post('menus')
  createMenu(@Body() data: MenuInterface) {
    return this.service.createMenu(data);
  }

  @Delete('menus/:id')
  deleteMenu(@Param('id') id: string) {
    return this.service.deleteMenu(+id);
  }
}
