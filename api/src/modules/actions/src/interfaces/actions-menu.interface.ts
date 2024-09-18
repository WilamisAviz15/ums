// import { MenuInterface } from '../../menus/interfaces/menu.interface';
// import { PrivilegeInterface } from '../../menus/interfaces/privilege.interface';
import { ActionInterface } from './action.interface';

export interface ActionsMenuInterface {
  id?: number;
  actionId: number;
  menuId: number;
  // menu?: MenuInterface;
  // privileges?: PrivilegeInterface[];
  action?: ActionInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
