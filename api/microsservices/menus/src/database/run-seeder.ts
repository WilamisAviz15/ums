import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';

import { MenuGroupsSeed } from './seeds/menu-groups.seed';
import { MenusSeed } from './seeds/menus.seed';
import { PrivilegesSeed } from './seeds/privileges.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [MenuGroupsSeed, MenusSeed, PrivilegesSeed],
    });
  }
}
