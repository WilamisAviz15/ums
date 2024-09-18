import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserRoleService {
  constructor(@Inject('USERS_ROLES') private readonly msUsersRoles: ClientProxy) {}

  getUsersRolesByUserId(userId: number) {
    return this.msUsersRoles.send('get_users_roles_by_user_id', userId);
  }
}
