import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// import { UserRoleInterface } from '../../../modules/roles/interfaces/user-role.interface';

@ValidatorConstraint({ name: 'RoleUserAlreadyExist', async: true })
export class RoleUserAlreadyExist implements ValidatorConstraintInterface {
  constructor() {}
  //TODO: interface
  validate(roles: any[]): boolean {
    const result = roles.find((role, index) =>
      roles.some((item, i) => index !== i && role.id === item.id),
    );
    return !result;
  }
}
