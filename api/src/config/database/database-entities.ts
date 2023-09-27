import { MenusGroupEntity } from '../../modules/menus-groups/entities/menus-group.entity';
import { RoleEntity } from '../../modules/roles/entities/role.entity';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { ActionEntity } from '../../modules/actions/entities/action.entity';
import { MenuEntity } from '../../modules/menus/entities/menu.entity';
import { ActionsMenuEntity } from '../../modules/actions/entities/actions-menu.entity';
import { PrivilegeEntity } from '../../modules/menus/entities/privilege.entity';

export const entities = [
  RoleEntity,
  PrivilegeEntity,
  UserEntity,
  ActionEntity,
  ActionsMenuEntity,
  MenuEntity,
  MenusGroupEntity,
];
