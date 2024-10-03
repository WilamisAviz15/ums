import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { UserService } from './user.service';
import { AuthUser } from './decorators/user.decorator';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserJwtInterface } from '../../authentication/src/interfaces/user-jwt.interface';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('users')
  createUser(@Body() createUserRequest: any) {
    return this.service.createUser(createUserRequest);
  }

  @Get('users')
  getUsers() {
    return this.service.getUsers();
  }

  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUserById(id);
  }

  @Post('users/findUserByEmail')
  findUserByEmail(@Body() email: string) {
    return this.service.findUserByEmail(email);
  }

  @Post('users/findUserByLogin')
  findUserByLogin(@Body() username: string) {
    return this.service.findUserByLogin(username);
  }

  @Post('users/findUserByCpf')
  findUserByCpf(@Body() username: string) {
    return this.service.findUserByCpf(username);
  }

  @Put('users/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDto, @AuthUser() user: UserJwtInterface) {
    return this.service.updateUser(id, data, user);
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.service.deleteUser(+id);
  }
}
