import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { LoginDto } from './dtos/login.dto';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('auth/login')
  async login(@Body() data: LoginDto) {
    return this.service.login(data);
  }
}
