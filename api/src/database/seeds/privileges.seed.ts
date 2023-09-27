import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { PrivilegeEntity } from '../../modules/menus/entities/privilege.entity';

export class PrivilegesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PrivilegeEntity);
    await repository.insert([
      { roleId: 1, actionMenuId: 1 },
      { roleId: 1, actionMenuId: 2 },
      { roleId: 1, actionMenuId: 3 },
      { roleId: 1, actionMenuId: 4 },
      { roleId: 1, actionMenuId: 5 },
      { roleId: 1, actionMenuId: 6 },
      { roleId: 1, actionMenuId: 7 },
      { roleId: 1, actionMenuId: 8 },
      { roleId: 1, actionMenuId: 9 },
      { roleId: 1, actionMenuId: 10 },
      { roleId: 1, actionMenuId: 11 },
      { roleId: 1, actionMenuId: 12 },
      { roleId: 1, actionMenuId: 13 },
      { roleId: 1, actionMenuId: 14 },
      { roleId: 1, actionMenuId: 15 },
      { roleId: 1, actionMenuId: 16 },
      { roleId: 1, actionMenuId: 17 },
      { roleId: 1, actionMenuId: 18 },
      { roleId: 1, actionMenuId: 19 },
      { roleId: 1, actionMenuId: 20 },
      { roleId: 1, actionMenuId: 21 },
      { roleId: 1, actionMenuId: 22 },
      { roleId: 1, actionMenuId: 23 },
      { roleId: 1, actionMenuId: 24 },
      { roleId: 1, actionMenuId: 25 },
      { roleId: 1, actionMenuId: 26 },
      { roleId: 1, actionMenuId: 27 },
      { roleId: 1, actionMenuId: 28 },
      { roleId: 1, actionMenuId: 29 },
      { roleId: 1, actionMenuId: 30 },
      { roleId: 1, actionMenuId: 31 },
      { roleId: 1, actionMenuId: 32 },
      { roleId: 1, actionMenuId: 33 },
      { roleId: 1, actionMenuId: 34 },
      { roleId: 1, actionMenuId: 35 },
    ]);
  }
}
