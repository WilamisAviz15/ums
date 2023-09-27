import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { MenusGroupsService } from './menus-groups.service';
import { MenusGroupInterface } from './interfaces/menus-group.interface';
import { Roles } from '../../shared/decorators/role.decorator';
import { MenusGroupCreateDto } from './dto/create-menus-group.dto';
import { MenusGroupUpdateDto } from './dto/update-menus-group.dto';

@Controller('menus-groups')
export class MenusGroupsController {
  constructor(private service: MenusGroupsService) {}

  @Get()
  @Roles('MENUS-GROUP_LISTAR')
  async findAll(): Promise<MenusGroupInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles('MENUS-GROUP_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenusGroupInterface> {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles('MENUS-GROUP_INCLUIR')
  async create(
    @Body() data: MenusGroupCreateDto,
  ): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  @Roles('MENUS-GROUP_EDITAR')
  async update(
    @Body() data: MenusGroupUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  @Roles('MENUS-GROUP_EXCLUIR')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
