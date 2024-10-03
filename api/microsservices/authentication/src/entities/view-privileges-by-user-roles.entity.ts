import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'view_privileges_by_user_roles',
})
export class ViewPrivilegesByUserRolesEntity {
  @ViewColumn()
  key: string;

  @ViewColumn({ name: 'role_id' })
  roleId: number;

  @ViewColumn({ name: 'action_id' })
  actionId: number;

  @ViewColumn()
  menu: string;

  @ViewColumn({ name: 'menu_key' })
  menuKey: string;

  @ViewColumn()
  route: string;
}
