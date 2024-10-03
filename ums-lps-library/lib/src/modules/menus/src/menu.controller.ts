import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { MenuInterface } from './interfaces/menu.interface';
import { MenuService } from './menu.service';
import { ActionsMenuInterface } from '../../../modules/actions/src/interfaces/actions-menu.interface';

@Controller()
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get('menus')
  getMenus() {
    return this.service.getMenus();
  }

  @Get('menus/:id')
  getMenusById(@Param('id') id: string) {
    return this.service.getMenusById(+id);
  }

  @Post('menus')
  createMenu(@Body() data: MenuInterface) {
    return this.service.createMenu(data);
  }

  @Delete('menus/:id')
  deleteMenu(@Param('id') id: string) {
    return this.service.deleteMenu(+id);
  }

  @Patch('menus/remove-privileges')
  removePrivileges(@Body() data: ActionsMenuInterface[]) {
    return this.service.removePrivileges(data);
  }
}
