import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';
import { UsersSeed } from './seeds/users.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UsersSeed],
    });
  }
}
