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

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('ROLES') private readonly msRoles: ClientProxy,
    @Inject('ACTIONS') private readonly msActions: ClientProxy,
    @Inject('MENUS') private readonly msMenus: ClientProxy,
  ) {}

  getUsers(): Observable<any> {
    return this.msUsers.send({ cmd: 'get_users' }, {});
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

  getRoles() {
    return this.msRoles.send({ cmd: 'get_roles' }, {});
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

  createMenu(data: MenuInterface) {
    return this.msMenus.send('create_menu', data);
  }

  deleteMenu(id: number) {
    return this.msMenus.send('delete_menu', id);
  }

  removePrivileges(actionsMenu: ActionsMenuInterface[]) {
    return this.msMenus.send('remove_privileges', actionsMenu);
  }
}
