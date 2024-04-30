import { ActionsMenuInterface } from '../interfaces/actions-menu.interface';

export interface MenuFilterInterface {
  id?: number;
  menu?: string;
  route?: string;
  icon?: string;
  menuGroupId?: number;
  menuKey?: string;
  actionsMenus?: ActionsMenuInterface;
}
