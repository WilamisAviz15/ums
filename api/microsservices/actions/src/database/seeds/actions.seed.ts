import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { ActionEntity } from '../../entities/action.entity';

export class ActionsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ActionEntity);
    await repository.insert([
      { name: 'MENU' },
      { name: 'LISTAR' },
      { name: 'INCLUIR' },
      { name: 'EDITAR' },
      { name: 'EXCLUIR' },
    ]);
  }
}
