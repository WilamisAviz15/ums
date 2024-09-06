import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UsersRolesService } from './users-roles.service';
import { UserRoleInterface } from './interfaces/user-role.interface';
import { UsersRolesCreateDto } from './dto/create-users-roles.dto';
import { UsersRolesUpdateDto } from './dto/update-users-roles.dto';

@Controller()
export class UsersRolesController {
  constructor(private readonly service: UsersRolesService) {}

  @MessagePattern('get_users_roles_by_user_id')
  async findOne(userId: number): Promise<UserRoleInterface[]> {
    return await this.service.findOneByUserId(userId);
  }
}
