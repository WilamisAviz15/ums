import { MenusGroupInterface } from '../../../modules/menus-groups/interfaces/menus-group.interface';
import { ActionsMenuInterface } from '../../../modules/actions/interfaces/actions-menu.interface';

export interface MenuInterface {
  id?: number;
  name: string;
  menuKey: string;
  route: string;
  icon: string;
  menuGroupId: number;
  group?: MenusGroupInterface;
  actionsMenus?: ActionsMenuInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
