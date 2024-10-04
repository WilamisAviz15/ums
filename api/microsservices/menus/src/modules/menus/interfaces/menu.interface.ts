import { MenusGroupInterface } from '../../menus-groups/interfaces/menus-group.interface';

export interface MenuInterface {
  id?: number;
  name: string;
  menuKey: string;
  route: string;
  icon: string;
  menuGroupId: number;
  group?: MenusGroupInterface;
  actionsMenus?: number[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
