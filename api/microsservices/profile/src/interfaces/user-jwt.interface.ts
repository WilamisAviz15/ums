export interface UserJwtInterface {
  id: number;
  name: string;
  email: string;
  cpf: string;
  register: string;
  rolesId?: number[];
  // menus: ViewMenuByUserRolesEntity[];
  // privileges: ViewPrivilegesByUserRolesEntity[];
  createdAt: Date;
}
