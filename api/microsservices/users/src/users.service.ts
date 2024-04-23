import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: any[] = [];

  handleUserCreated(data: any) {
    console.log('handlerUserCreated - USERS', data);
    this.users.push({
      email: data.email,
      timestamp: new Date(),
    });
  }

  getUsers() {
    return this.users;
  }
}
