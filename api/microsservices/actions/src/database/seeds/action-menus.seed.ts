import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { ActionsMenuEntity } from '../../entities/actions-menu.entity';

export class ActionsMenuSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ActionsMenuEntity);
    await repository.insert([
      { actionId: 1, menuId: 1 },
      { actionId: 2, menuId: 1 },
      { actionId: 3, menuId: 1 },
      { actionId: 4, menuId: 1 },
      { actionId: 5, menuId: 1 },
      { actionId: 1, menuId: 2 },
      { actionId: 2, menuId: 2 },
      { actionId: 3, menuId: 2 },
      { actionId: 4, menuId: 2 },
      { actionId: 5, menuId: 2 },
      { actionId: 1, menuId: 3 },
      { actionId: 2, menuId: 3 },
      { actionId: 3, menuId: 3 },
      { actionId: 4, menuId: 3 },
      { actionId: 5, menuId: 3 },
      { actionId: 1, menuId: 4 },
      { actionId: 2, menuId: 4 },
      { actionId: 3, menuId: 4 },
      { actionId: 4, menuId: 4 },
      { actionId: 5, menuId: 4 },
      { actionId: 1, menuId: 5 },
      { actionId: 2, menuId: 5 },
      { actionId: 3, menuId: 5 },
      { actionId: 4, menuId: 5 },
      { actionId: 5, menuId: 5 },
      { actionId: 1, menuId: 6 },
      { actionId: 2, menuId: 6 },
      { actionId: 3, menuId: 6 },
      { actionId: 4, menuId: 6 },
      { actionId: 5, menuId: 6 },
      { actionId: 1, menuId: 7 },
      { actionId: 2, menuId: 7 },
      { actionId: 3, menuId: 7 },
      { actionId: 4, menuId: 7 },
      { actionId: 5, menuId: 7 },
      { actionId: 1, menuId: 8 },
      { actionId: 2, menuId: 8 },
      { actionId: 3, menuId: 8 },
      { actionId: 4, menuId: 8 },
      { actionId: 5, menuId: 8 },
      { actionId: 1, menuId: 9 },
      { actionId: 2, menuId: 9 },
      { actionId: 3, menuId: 9 },
      { actionId: 4, menuId: 9 },
      { actionId: 5, menuId: 9 },
      { actionId: 1, menuId: 10 },
      { actionId: 2, menuId: 10 },
      { actionId: 3, menuId: 10 },
      { actionId: 4, menuId: 10 },
      { actionId: 5, menuId: 10 },
    ]);
  }
}
