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

import { MenuInterface } from './interfaces/menu.interface';

import { MenusService } from './menus.service';
import { Roles } from '../../shared/decorators/role.decorator';
import { MenuUpdateDto } from './dto/update-menu.dto';
import { MenuCreateDto } from './dto/create-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get()
  @Roles('MENUS_LISTAR')
  async findAll(): Promise<MenuInterface[]> {
    return this.menusService.findAll();
  }

  @Get(':id')
  @Roles('MENUS_LISTAR')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MenuInterface> {
    return this.menusService.findOne(id);
  }

  @Post()
  @Roles('MENUS_INCLUIR')
  async create(
    @Body() menuCreate: MenuCreateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    return this.menusService.create(menuCreate);
  }

  @Put(':id')
  @Roles('MENUS_EDITAR')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() menuUpdate: MenuUpdateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    return this.menusService.update(id, menuUpdate);
  }

  @Delete(':id')
  @Roles('MENUS_EXCLUIR')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.menusService.delete(id);
  }
}
