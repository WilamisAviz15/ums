import { ActionsMenuInterface } from './actions-menu.interface';

export interface PrivilegeInterface {
  id?: number;
  roleId: number;
  actionMenuId: number;
  actionsMenus: ActionsMenuInterface;
  key?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
