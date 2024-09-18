import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { MenusGroupInterface } from './interfaces/menus-group.interface';
import { MenusGroupUpdateDto } from './dto/update-menus-group.dto';
import { MenuGroupService } from './menus-group.service';

@Controller()
export class MenuGroupController {
  constructor(private readonly service: MenuGroupService) {}

  @Get('menus-groups')
  getMenusGroups() {
    return this.service.getMenusGroups();
  }

  @Get('menus-groups/:id')
  getMenusGroupsById(@Param('id') id: string) {
    return this.service.getMenusGroupsById(+id);
  }

  @Post('menus-groups')
  createMenuGroup(@Body() data: MenusGroupInterface) {
    return this.service.createMenuGroup(data);
  }

  @Put('menus-groups/:id')
  async updateMenuGroup(@Body() data: MenusGroupUpdateDto, @Param('id', ParseIntPipe) id: number) {
    return this.service.updateMenuGroup(data, id);
  }

  @Delete('menus-groups/:id')
  removeMenuGroup(@Param('id') id: string) {
    return this.service.deleteMenuGroup(+id);
  }
}
