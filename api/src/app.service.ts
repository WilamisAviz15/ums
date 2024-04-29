import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';

import { UserInterface } from './interfaces/user-interface';
import { UserUpdateDto } from './modules/users/dto/update-user.dto';
import { UserJwtInterface } from './authentication/interfaces/user-jwt.interface';
import { RoleInterface } from './modules/roles/interfaces/role.interface';
import { RoleUpdateDto } from './modules/roles/dto/update-role.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('ROLES') private readonly msRoles: ClientProxy,
    @Inject('ACTIONS') private readonly msActions: ClientProxy,
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
}
