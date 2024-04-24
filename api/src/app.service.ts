import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UserInterface } from './interfaces/user-interface';
import { Observable } from 'rxjs/internal/Observable';
import { UserUpdateDto } from './modules/users/dto/update-user.dto';
import { UserJwtInterface } from './authentication/interfaces/user-jwt.interface';

@Injectable()
export class AppService {
  constructor(@Inject('USERS') private readonly msUsers: ClientProxy) {}

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
}
