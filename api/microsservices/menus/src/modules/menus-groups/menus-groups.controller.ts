import { Body, Controller } from '@nestjs/common';
import { MenusGroupsService } from './menus-groups.service';
import { MenusGroupInterface } from './interfaces/menus-group.interface';
import { MessagePattern } from '@nestjs/microservices';
import { MenusGroupCreateDto } from './dto/create-menus-group.dto';
import { MenusGroupUpdateDto } from './dto/update-menus-group.dto';

@Controller('menus-groups')
export class MenusGroupsController {
  constructor(private readonly service: MenusGroupsService) {}

  @MessagePattern('get_menus_groups')
  async findAll(@Body() filters: MenusGroupInterface) {
    return await this.service.findAll(filters);
  }

  @MessagePattern('create_menu_groups')
  async create(
    @Body() data: MenusGroupCreateDto,
  ): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_menu_groups')
  async update(
    @Body()
    { id, data }: { id: number; data: MenusGroupUpdateDto },
  ): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @MessagePattern('delete_menu_groups')
  async delete(@Body() id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
