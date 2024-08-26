import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthUser } from './decorators/user.decorator';
import { UserInterface } from './interfaces/user.interface';
import { UserCreateDto } from './dto/create-user.dto';
import { UserFilterInterface } from './interfaces/user-filter.interface';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserJwtInterface } from './utils/utils';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @EventPattern('create_user')
  async create(
    @Body() data: UserCreateDto,
    @AuthUser() currentUser: UserInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.service.create(data, currentUser);
  }

  @EventPattern('update_user')
  async update(
    @Body()
    {
      id,
      data,
      user,
    }: {
      id: number;
      data: UserUpdateDto;
      user: UserJwtInterface;
    },
  ) {
    return this.service.update(data, user, +id);
  }

  @EventPattern('delete_user')
  async remove(@Body() id: string) {
    return this.service.delete(+id);
  }

  @MessagePattern({ cmd: 'get_users' })
  async findAll(
    @Body() filters: UserFilterInterface,
  ): Promise<UserInterface[]> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('find_user_by_email')
  async findByEmail(
    @Body() data: { username: string; user?: UserInterface },
  ): Promise<UserInterface> {
    return await this.service.findByEmail(data.username, data.user);
  }

  @MessagePattern('find_user_by_login')
  async findByRegister(
    @Body() data: { register: string },
  ): Promise<UserInterface> {
    return await this.service.findByRegister(data.register);
  }

  @MessagePattern('find_user_by_id')
  async findById(@Body() id: string): Promise<UserInterface> {
    return await this.service.findOne(+id);
  }
}
