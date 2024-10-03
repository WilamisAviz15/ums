import { RoleInterface } from './role.interface';
import { UserInterface } from './user.interface';

export interface UserRoleInterface {
  user?: UserInterface;
  roles?: RoleInterface[];
}
