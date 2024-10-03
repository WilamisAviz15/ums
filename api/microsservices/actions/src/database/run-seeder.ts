import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';

import { ActionsSeed } from './seeds/actions.seed';
import { ActionsMenuSeed } from './seeds/action-menus.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ActionsSeed, ActionsMenuSeed],
    });
  }
}
