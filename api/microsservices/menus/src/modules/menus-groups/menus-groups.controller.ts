import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MenusGroupsService } from './menus-groups.service';
import { MenusGroupInterface } from './interfaces/menus-group.interface';
import { MenusGroupCreateDto } from './dto/create-menus-group.dto';
import { MenusGroupUpdateDto } from './dto/update-menus-group.dto';

@Controller('menus-groups')
export class MenusGroupsController {
  constructor(private readonly service: MenusGroupsService) {}

  @Get()
  async findAll(@Body() filters: MenusGroupInterface) {
    return await this.service.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Post()
  async create(@Body() data: MenusGroupCreateDto): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: MenusGroupUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
