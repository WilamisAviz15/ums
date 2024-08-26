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
import { ActionInterface } from './modules/actions/interfaces/action.interface';
import { ActionUpdateDto } from './modules/actions/dto/update-action.dto';
import { ActionsMenuInterface } from './modules/actions/interfaces/actions-menu.interface';
import { Patch } from '@nestjs/common/decorators';
import { EditPersonalDataDto } from './modules/profile/dto/edit-profile.dto';
import { LoginDto } from './authentication/dtos/login.dto';
import { MealInterface } from './modules/meals/interfaces/meal.interface';
import { MealUpdateDto } from 'microsservices/meals/src/modules/meals/dto/update-meal.dto';
import { MenuMealInterface } from './modules/menu-meal/interfaces/menu-meal.interface';
import { MenuMealUpdateDto } from './modules/menu-meal/dto/update-menu-meal.dto';
import { MenuMealCreateDto } from './modules/menu-meal/dto/create-menu-meal.dto';
import { ScheduleCreateDto } from 'microsservices/schedules/src/dto/create-schedule.dto';
import { ScheduleUpdateDto } from 'microsservices/schedules/src/dto/update-schedule.dto';

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

  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUserById(id);
  }

  @Post('users/findUserByEmail')
  findUserByEmail(@Body() email: string) {
    return this.service.findUserByEmail(email);
  }

  @Post('users/findUserByLogin')
  findUserByLogin(@Body() username: string) {
    return this.service.findUserByLogin(username);
  }

  @Post('users/findUserByCpf')
  findUserByCpf(@Body() username: string) {
    return this.service.findUserByCpf(username);
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

  @Post('actions')
  createAction(@Body() data: ActionInterface) {
    return this.service.createAction(data);
  }

  @Put('actions/:id')
  async updateAction(
    @Body() data: ActionUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.updateAction(data, id);
  }

  @Delete('actions/:id')
  deleteAction(@Param('id') id: string) {
    return this.service.deleteAction(+id);
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

  @Patch('menus/remove-privileges')
  removePrivileges(@Body() data: ActionsMenuInterface[]) {
    return this.service.removePrivileges(data);
  }

  @Patch('profile')
  updateProfile(@Body() data: EditPersonalDataDto) {
    return this.service.updateProfile(data);
  }

  @Post('auth/login')
  async login(@Body() data: LoginDto) {
    return this.service.login(data);
  }

  @Get('meals')
  getMeals() {
    return this.service.getMeals();
  }

  @Post('meals')
  createMeal(@Body() data: MealInterface) {
    return this.service.createMeal(data);
  }

  @Put('meals/:id')
  async updateMeal(
    @Body() data: MealUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    data.id = id;
    return this.service.updateMeal(data);
  }

  @Delete('meals/:id')
  removeMeal(@Param('id') id: string) {
    return this.service.deleteMeal(+id);
  }

  @Get('menu-meals')
  getMenusMeals() {
    return this.service.getMenusMeals();
  }

  @Post('menu-meals')
  createMenuMeals(@Body() data: MenuMealCreateDto) {
    return this.service.createMenuMeal(data);
  }

  @Put('menu-meals/:id')
  async updateMenuMeals(
    @Body() data: MenuMealUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    data.id = id;
    return this.service.updateMenuMeal(data);
  }

  @Delete('menu-meals/:id')
  removeMenuMeals(@Param('id') id: string) {
    return this.service.deleteMenuMeal(+id);
  }

  @Get('schedules/user/:userId')
  getSchedules(@Param('userId') userId: number) {
    return this.service.getSchedules(userId);
  }

  @Patch('schedules/confirm-meal')
  confirmSchedules(@Body() data: ScheduleCreateDto) {
    return this.service.confirmSchedule(data);
  }

  @Get('schedules/cpf/:cpf')
  findByUserCPF(@Param('cpf') cpf?: string) {
    return this.service.findByUserCPF(cpf);
  }

  @Post('schedules')
  createSchedules(@Body() data: ScheduleCreateDto) {
    return this.service.createSchedule(data);
  }

  @Put('schedules/:id')
  async updateSchedules(
    @Body() data: ScheduleUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    data.id = id;
    return this.service.updateSchedule(data);
  }

  @Delete('schedules/:id')
  removeSchedules(@Param('id') id: string) {
    return this.service.deleteSchedule(+id);
  }
}
