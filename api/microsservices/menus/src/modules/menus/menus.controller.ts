import { MessagePattern } from '@nestjs/microservices';
import { Body, Controller } from '@nestjs/common';

import { MenusService } from './menus.service';
import { MenuInterface } from './interfaces/menu.interface';
import { MenuFilterInterface } from './interfaces/menu-filter.interface';
import { MenuCreateDto } from './dto/create-menu.dto';
import { ActionsMenuInterface } from './interfaces/actions-menu.interface';

@Controller('menus')
export class MenusController {
  constructor(private service: MenusService) {}

  @MessagePattern('get_menus')
  async findAll(
    @Body() filters: MenuFilterInterface,
  ): Promise<MenuInterface[]> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('get_menus_by_id')
  async findOne(@Body() id: number): Promise<MenuInterface> {
    return await this.service.findOne(id);
  }

  @MessagePattern('create_menu')
  async create(
    @Body() data: MenuCreateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('delete_menu')
  async delete(@Body() id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }

  @MessagePattern('remove_privileges')
  removePrivileges(@Body() actionsMenu: ActionsMenuInterface[]) {
    return this.service.removePrivileges(actionsMenu);
  }
}
