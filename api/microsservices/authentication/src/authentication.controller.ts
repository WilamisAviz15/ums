import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

@Controller()
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @MessagePattern('login')
  login(
    @Body() @Body() data: LoginDto,
  ): Promise<{ user: UserJwtInterface; accessToken: string }> {
    return this.service.login(data);
  }
}
