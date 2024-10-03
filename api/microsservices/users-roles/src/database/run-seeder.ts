import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';

import { UsersRolesSeed } from './seeds/user-roles.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UsersRolesSeed],
    });
  }
}
