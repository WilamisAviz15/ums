import { ViewMenuByUserRolesEntity } from '../entities/view-menu-by-user-roles.entity';
import { ViewPrivilegesByUserRolesEntity } from '../entities/view-privileges-by-user-roles.entity';

export interface UserJwtInterface {
  id: number;
  name: string;
  email: string;
  cpf: string;
  register: string;
  rolesId?: number[];
  menus: ViewMenuByUserRolesEntity[];
  privileges: ViewPrivilegesByUserRolesEntity[];
  createdAt: Date;
}
