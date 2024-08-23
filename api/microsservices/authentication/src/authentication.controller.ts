import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthenticationService } from './authentication.service';
import { UserInterface } from './interfaces/user.interface';
import { LoginDto } from './dtos/login.dto';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

@Controller()
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @MessagePattern('login')
  login(
    @Body() @Body() data: LoginDto,
  ): Promise<{ user: UserJwtInterface; accessToken: string }> {
    console.log('d', data);
    return this.service.login(data);
  }
}
