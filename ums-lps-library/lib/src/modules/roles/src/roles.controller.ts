import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { RoleService } from './roles.service';
import { RoleUpdateDto } from './dto/update-role.dto';
import { RoleInterface } from './interfaces/role.interface';

@Controller()
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get('roles')
  getRoles() {
    return this.service.getRoles();
  }

  @Get('roles/:id')
  getRolesById(@Param('id') id: string) {
    return this.service.getRolesById(+id);
  }

  @Post('roles')
  createRoles(@Body() data: RoleInterface) {
    return this.service.createRole(data);
  }

  @Put('roles/:id')
  async updateRoles(@Body() data: RoleUpdateDto, @Param('id', ParseIntPipe) id: number) {
    return this.service.updateRole(data, id);
  }

  @Delete('roles/:id')
  removeRole(@Param('id') id: string) {
    return this.service.deleteRole(+id);
  }
}
