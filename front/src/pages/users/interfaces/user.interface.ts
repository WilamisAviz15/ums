import { RoleInterface } from "../../roles/interfaces/role.interface";

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  register: string;
  roles?: RoleInterface[];
  password?: string;
  confirmPassword?: string;
  lastAccess?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
