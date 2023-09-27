import { MenusGroupEntity } from '../../modules/menus-groups/entities/menus-group.entity';
import { RoleEntity } from '../../modules/roles/entities/role.entity';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { ActionEntity } from '../../modules/actions/entities/action.entity';
import { MenuEntity } from '../../modules/menus/entities/menu.entity';
import { ActionsMenuEntity } from '../../modules/actions/entities/actions-menu.entity';
import { PrivilegeEntity } from '../../modules/menus/entities/privilege.entity';
import { ViewMenuByUserRolesEntity } from '../../authentication/entities/view-menu-by-user-roles.entity';
import { ViewPrivilegesByUserRolesEntity } from '../../authentication/entities/view-privileges-by-user-roles.entity';
import { MealEntity } from '../../modules/meals/entities/meal.entity';
import { ScheduleEntity } from '../../modules/schedules/entities/schedule.entity';

export const entities = [
  UserEntity,
  RoleEntity,
  PrivilegeEntity,
  ActionEntity,
  ActionsMenuEntity,
  MenuEntity,
  MenusGroupEntity,
  ViewMenuByUserRolesEntity,
  ViewPrivilegesByUserRolesEntity,
  MealEntity,
  ScheduleEntity,
];
