export interface UserJwtInterface {
  id: number;
  name: string;
  email: string;
  cpf: string;
  register: string;
  rolesId?: number[];
  //TODO:
  // menus: ViewMenuByAdminRolesEntity[];
  // privileges: ViewPrivilegesByAdminRolesEntity[];
  createdAt: Date;
}
