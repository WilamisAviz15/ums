import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';
import { UsersSeed } from './seeds/users.seed';
import { RolesSeed } from './seeds/role.seed';
import { ActionsSeed } from './seeds/actions.seed';
import { ActionsMenuSeed } from './seeds/action-menus.seed';
import { MenusSeed } from './seeds/menus.seed';
import { MenuGroupsSeed } from './seeds/menu-groups.seed';
import { PrivilegesSeed } from './seeds/privileges.seed';
import { UsersRolesSeed } from './seeds/user-roles.seed';
import { MealsSeed } from './seeds/meals.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [
        UsersSeed,
        RolesSeed,
        MenuGroupsSeed,
        MenusSeed,
        ActionsSeed,
        ActionsMenuSeed,
        PrivilegesSeed,
        UsersRolesSeed,
        MealsSeed,
      ],
    });
  }
}
