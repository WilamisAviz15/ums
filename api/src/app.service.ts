import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';

import { UserInterface } from './interfaces/user-interface';
import { UserUpdateDto } from './modules/users/dto/update-user.dto';
import { UserJwtInterface } from './authentication/interfaces/user-jwt.interface';
import { RoleInterface } from './modules/roles/interfaces/role.interface';
import { RoleUpdateDto } from './modules/roles/dto/update-role.dto';
import { MenuInterface } from './modules/menus/interfaces/menu.interface';
import { MenusGroupUpdateDto } from './modules/menus-groups/dto/update-menus-group.dto';
import { MenusGroupInterface } from './modules/menus-groups/interfaces/menus-group.interface';
import { ActionInterface } from './modules/actions/interfaces/action.interface';
import { ActionUpdateDto } from './modules/actions/dto/update-action.dto';
import { ActionsMenuInterface } from './modules/actions/interfaces/actions-menu.interface';
import { EditPersonalDataDto } from './modules/profile/dto/edit-profile.dto';
import { LoginDto } from './authentication/dtos/login.dto';
import { MealInterface } from './modules/meals/interfaces/meal.interface';
import { MealUpdateDto } from 'microsservices/meals/src/modules/meals/dto/update-meal.dto';
import { MenuMealCreateDto } from './modules/menu-meal/dto/create-menu-meal.dto';
import { MenuMealUpdateDto } from './modules/menu-meal/dto/update-menu-meal.dto';
import { ScheduleUpdateDto } from './modules/schedules/dto/update-schedule.dto';
import { ScheduleCreateDto } from './modules/schedules/dto/create-schedule.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('ROLES') private readonly msRoles: ClientProxy,
    @Inject('ACTIONS') private readonly msActions: ClientProxy,
    @Inject('MENUS') private readonly msMenus: ClientProxy,
    @Inject('PROFILE') private readonly msProfile: ClientProxy,
    @Inject('AUTHENTICATION') private readonly msAuthentication: ClientProxy,
    @Inject('MEALS') private readonly msMeals: ClientProxy,
    @Inject('SCHEDULES') private readonly msSchedules: ClientProxy,
  ) {}

  getUsers(): Observable<any> {
    return this.msUsers.send({ cmd: 'get_users' }, {});
  }

  getUserById(id: number): Observable<any> {
    return this.msUsers.send('find_user_by_id', id);
  }

  findUserByCpf(cpf: string): Observable<any> {
    return this.msUsers.send('find_user_by_cpf', cpf);
  }

  createUser(createUserRequest: UserInterface): Observable<any> {
    return this.msUsers.send('create_user', createUserRequest);
  }

  updateUser(id: number, data: UserUpdateDto, user: UserJwtInterface) {
    return this.msUsers.send('update_user', { id, data, user });
  }

  deleteUser(id: number) {
    return this.msUsers.send('delete_user', id);
  }

  findUserByEmail(email: string) {
    return this.msUsers.send('find_user_by_email', email);
  }

  findUserByLogin(username: string) {
    return this.msUsers.send('find_user_by_login', username);
  }

  getRoles() {
    return this.msRoles.send({ cmd: 'get_roles' }, {});
  }

  getRolesById(id: number) {
    return this.msRoles.send({ cmd: 'get_roles_by_id' }, id);
  }

  createRole(data: RoleInterface) {
    return this.msRoles.send('create_role', data);
  }

  updateRole(data: RoleUpdateDto, id: number) {
    return this.msRoles.send('update_role', { data, id });
  }

  deleteRole(id: number) {
    return this.msRoles.send('delete_role', id);
  }

  getActions() {
    return this.msActions.send('get_actions', {});
  }

  getActionsById(id: number) {
    return this.msActions.send('get_actions_by_id', { id });
  }

  createAction(data: ActionInterface): Observable<any> {
    return this.msActions.send('create_action', data);
  }

  updateAction(data: ActionUpdateDto, id: number) {
    return this.msActions.send('update_action', { data, id });
  }

  deleteAction(id: number) {
    return this.msActions.send('delete_action', id);
  }

  getMenusGroups() {
    return this.msMenus.send('get_menus_groups', {});
  }

  getMenusGroupsById(id: number) {
    return this.msMenus.send('get_menus_groups_by_id', id);
  }

  createMenuGroup(data: MenusGroupInterface) {
    return this.msMenus.send('create_menu_groups', data);
  }

  updateMenuGroup(data: MenusGroupUpdateDto, id: number) {
    return this.msMenus.send('update_menu_groups', { data, id });
  }

  deleteMenuGroup(id: number) {
    return this.msMenus.send('delete_menu_groups', id);
  }

  getMenus() {
    return this.msMenus.send('get_menus', {});
  }

  getMenusById(id: number) {
    return this.msMenus.send('get_menus_by_id', id);
  }

  createMenu(data: MenuInterface) {
    return this.msMenus.send('create_menu', data);
  }

  deleteMenu(id: number) {
    return this.msMenus.send('delete_menu', id);
  }

  removePrivileges(actionsMenu: ActionsMenuInterface[]) {
    return this.msMenus.send('remove_privileges', actionsMenu);
  }

  updateProfile(profile: EditPersonalDataDto) {
    return this.msProfile.send('update_profile', profile);
  }

  login(data: LoginDto) {
    return this.msAuthentication.send('login', data);
  }

  getMeals() {
    return this.msMeals.send('get_meals', {});
  }

  getMealsById(id: number) {
    return this.msMeals.send('get_meals_by_id', id);
  }

  createMeal(data: MealInterface) {
    return this.msMeals.send('create_meal', data);
  }

  updateMeal(data: MealUpdateDto) {
    return this.msMeals.send('update_meal', data);
  }

  deleteMeal(id: number) {
    return this.msMeals.send('delete_meal', id);
  }

  getMenusMeals() {
    return this.msMeals.send('get_menus_meals', {});
  }

  getMenusMealsById(id: number) {
    return this.msMeals.send('get_menus_meals_by_id', id);
  }

  createMenuMeal(data: MenuMealCreateDto) {
    return this.msMeals.send('create_menu_meal', data);
  }

  updateMenuMeal(data: MenuMealUpdateDto) {
    return this.msMeals.send('update_menu_meal', data);
  }

  deleteMenuMeal(id: number) {
    return this.msMeals.send('delete_menu_meal', id);
  }

  getSchedules(userId: number) {
    return this.msSchedules.send('get_schedules', userId);
  }

  getSchedulesById(id: number) {
    return this.msSchedules.send('get_schedules_by_id', id);
  }

  createSchedule(createUserRequest: ScheduleCreateDto): Observable<any> {
    return this.msSchedules.send('create_schedules', createUserRequest);
  }

  updateSchedule(data: ScheduleUpdateDto) {
    return this.msSchedules.send('update_schedules', data);
  }

  deleteSchedule(id: number) {
    return this.msSchedules.send('delete_schedules', id);
  }

  confirmSchedule(data: ScheduleCreateDto) {
    return this.msSchedules.send('confirm_schedules', data);
  }

  findByUserCPF(cpf: string) {
    return this.msSchedules.send('get_schedules_by_user_cpf', cpf);
  }
}
