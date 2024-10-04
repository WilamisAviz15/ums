import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(@Inject('AUTHENTICATION') private readonly msAuthentication: ClientProxy) {}

  login(data: LoginDto) {
    return this.msAuthentication.send('login', data);
  }
}
