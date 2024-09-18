import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';

import { UserInterface } from './interfaces/user.interface';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserJwtInterface } from '../../authentication/src/interfaces/user-jwt.interface';

@Injectable()
export class UserService {
  constructor(@Inject('USERS') private readonly msUsers: ClientProxy) {}

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
}
