import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';

import { TransactionTypeSeed } from './seeds/transaction-type.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [TransactionTypeSeed],
    });
  }
}
