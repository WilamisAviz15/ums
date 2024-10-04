import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { UserRoleInterface } from './interfaces/user-role.interface';
import { UsersRolesUpdateDto } from './dto/update-users-roles.dto';
import { Observable } from 'rxjs';
import { UsersRolesCreateDto } from './dto/create-users-roles.dto';

@Injectable()
export class UserRoleService {
  constructor(@Inject('USERS_ROLES') private readonly msUsersRoles: ClientProxy) {}

  getUsersRolesByUserId(userId: number) {
    return this.msUsersRoles.send('get_users_roles_by_user_id', userId);
  }

  create(createUserRequest: UsersRolesCreateDto): Observable<any> {
    return this.msUsersRoles.send('create_users_roles', createUserRequest);
  }

  update(userId: number, data: UsersRolesUpdateDto[]) {
    return this.msUsersRoles.send('update_users_roles', { userId, data });
  }

  delete(id: number) {
    return this.msUsersRoles.send('delete_users_roles', id);
  }
}
