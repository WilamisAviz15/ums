import { MessagePattern } from '@nestjs/microservices';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MenusService } from './menus.service';
import { MenuInterface } from './interfaces/menu.interface';
import { MenuFilterInterface } from './interfaces/menu-filter.interface';
import { MenuCreateDto } from './dto/create-menu.dto';
import { ActionsMenuInterface } from './interfaces/actions-menu.interface';

@Controller('menus')
export class MenusController {
  constructor(private service: MenusService) {}

  @Get()
  async findAll(
    @Body() filters: MenuFilterInterface,
  ): Promise<MenuInterface[]> {
    return await this.service.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MenuInterface> {
    return await this.service.findOne(+id);
  }

  @Post()
  async create(
    @Body() data: MenuCreateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    return await this.service.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }

  @Patch('remove-privileges')
  removePrivileges(@Body() actionsMenu: ActionsMenuInterface[]) {
    return this.service.removePrivileges(actionsMenu);
  }
}
