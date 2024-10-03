import { ActionInterface } from './action.interface';
import { MenuInterface } from './menu.interface';
import { PrivilegeInterface } from './privilege.interface';

export interface ActionsMenuInterface {
  id?: number;
  actionId: number;
  menuId: number;
  menu?: MenuInterface;
  privileges?: PrivilegeInterface[];
  action?: ActionInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
