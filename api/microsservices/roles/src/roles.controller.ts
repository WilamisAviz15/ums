import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { RolesService } from './roles.service';
import { RoleCreateDto } from './dto/create-role.dto';
import { RoleInterface } from './interfaces/role.interface';
import { RoleUpdateDto } from './dto/update-role.dto';
import { RoleFilterInterface } from './interfaces/role-filter.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  async create(@Body() data: RoleCreateDto): Promise<{ role: RoleInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: RoleUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ role: RoleInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Get()
  async findAll(@Body() filters: RoleFilterInterface): Promise<RoleInterface[]> {
    return await this.service.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleInterface> {
    return await this.service.findOne(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
