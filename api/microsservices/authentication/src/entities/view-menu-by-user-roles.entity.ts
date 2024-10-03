import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'view_menu_by_user_roles',
})
export class ViewMenuByUserRolesEntity {
  @ViewColumn()
  menu: string;

  @ViewColumn({ name: 'menu_group' })
  menuGroup: string;

  @ViewColumn()
  route: string;

  @ViewColumn()
  icon: string;

  @ViewColumn({ name: 'role_id' })
  roleId: number;

  @ViewColumn({ name: 'menu_key' })
  menuKey: string;
}
