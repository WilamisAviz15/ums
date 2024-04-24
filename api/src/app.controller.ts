import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserUpdateDto } from './modules/users/dto/update-user.dto';
import { UserJwtInterface } from './authentication/interfaces/user-jwt.interface';
import { AuthUser } from './shared/decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('users')
  createUser(@Body() createUserRequest: any) {
    return this.service.createUser(createUserRequest);
  }

  @Get('users')
  getUsers() {
    return this.service.getUsers();
  }

  @Put('users/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
    @AuthUser() user: UserJwtInterface,
  ) {
    this.service.updateUser(id, data, user);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.service.deleteUser(+id);
  }
}
