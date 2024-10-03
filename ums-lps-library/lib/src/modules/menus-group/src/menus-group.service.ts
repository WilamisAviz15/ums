import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { MenusGroupInterface } from './interfaces/menus-group.interface';
import { MenusGroupUpdateDto } from './dto/update-menus-group.dto';

@Injectable()
export class MenuGroupService {
  constructor(@Inject('MENUS') private readonly msMenus: ClientProxy) {}

  getMenusGroups() {
    return this.msMenus.send('get_menus_groups', {});
  }

  getMenusGroupsById(id: number) {
    return this.msMenus.send('get_menus_groups_by_id', id);
  }

  createMenuGroup(data: MenusGroupInterface) {
    return this.msMenus.send('create_menu_groups', data);
  }

  updateMenuGroup(data: MenusGroupUpdateDto, id: number) {
    return this.msMenus.send('update_menu_groups', { data, id });
  }

  deleteMenuGroup(id: number) {
    return this.msMenus.send('delete_menu_groups', id);
  }
}
