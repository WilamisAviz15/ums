import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { MenusGroupEntity } from '../../modules/menus-groups/entities/menus-group.entity';

export class MenuGroupsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MenusGroupEntity);
    await repository.insert([
      {
        name: 'Administração',
        order: 1,
      },
      {
        name: 'Configurações',
        order: 2,
      },
    ]);
  }
}
