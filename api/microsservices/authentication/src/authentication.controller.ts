import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('/login')
  login(@Body() @Body() data: LoginDto): Promise<{ user: UserJwtInterface; accessToken: string }> {
    return this.service.login(data);
  }
}
