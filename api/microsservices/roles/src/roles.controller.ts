import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { RolesService } from './roles.service';
import { RoleCreateDto } from './dto/create-role.dto';
import { RoleInterface } from './interfaces/role.interface';
import { RoleUpdateDto } from './dto/update-role.dto';
import { RoleFilterInterface } from './interfaces/role-filter.interface';

@Controller()
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @MessagePattern('create_role')
  async create(
    @Body() data: RoleCreateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_role')
  async update(
    @Body()
    { id, data }: { id: number; data: RoleUpdateDto },
  ): Promise<{ role: RoleInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @MessagePattern({ cmd: 'get_roles' })
  async findAll(
    @Body() filters: RoleFilterInterface,
  ): Promise<RoleInterface[]> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('delete_role')
  async delete(@Body() id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
