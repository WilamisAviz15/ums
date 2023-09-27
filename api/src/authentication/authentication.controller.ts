import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

import { AuthenticationService } from './authentication.service';
import { AuthUser } from '../shared/decorators/user.decorator';
import { ViewPrivilegeByRoleInterface } from '../modules/menus/interfaces/view-privilege-by-role.interface';
import { UserInterface } from '../modules/users/interfaces/user.interface';
import { LoginDto } from './dtos/login.dto';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Get('privileges')
  async getPrivileges(
    @AuthUser() user: UserJwtInterface,
  ): Promise<ViewPrivilegeByRoleInterface[]> {
    return await this.service.getUserPrivileges(user.rolesId);
  }

  @Post('login')
  async login(
    @Body() data: LoginDto,
  ): Promise<{ user: UserJwtInterface; accessToken: string }> {
    return this.service.login(data);
  }

  @Post('recover-password')
  async recoverPassword(
    @Body() recoverPassword: RecoverPasswordDto,
  ): Promise<{ message: string }> {
    return this.service.recoverPassword(recoverPassword);
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body() resetPassword: ResetPasswordDto,
    @Param('token') token: string,
  ): Promise<{ message: string }> {
    return this.service.resetPassword(token, resetPassword);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: { token: string }): Promise<{
    user: Partial<UserInterface>;
    accessToken: string;
    id: number;
  }> {
    return this.service.refreshToken(data.token);
  }
}
