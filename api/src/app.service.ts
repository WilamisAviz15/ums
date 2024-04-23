import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserEvent } from './events/create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(@Inject('USERS') private readonly msUsers: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: any) {
    this.users.push(createUserRequest);
    this.msUsers.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
  }

  getUsers() {
    return this.msUsers.send({ cmd: 'get_users' }, {});
  }
}
