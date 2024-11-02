import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { MenuInterface } from './interfaces/menu.interface';
import { ActionsMenuInterface } from '../../../modules/actions/src/interfaces/actions-menu.interface';

@Injectable()
export class MenuService {
  constructor(@Inject('MENUS') private readonly msMenus: ClientProxy) {}
  getMenus() {
    return this.msMenus.send('get_menus', {});
  }

  getMenusById(id: number) {
    return this.msMenus.send('get_menus_by_id', id);
  }

  createMenu(data: MenuInterface) {
    return this.msMenus.send('create_menu', data);
  }

  deleteMenu(id: number) {
    return this.msMenus.send('delete_menu', id);
  }

  removePrivileges(actionsMenu: ActionsMenuInterface[]) {
    return this.msMenus.send('remove_privileges', actionsMenu);
  }
}
