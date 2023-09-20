import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { RoleEntity } from './../../modules/roles/entities/role.entity';

export class RolesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RoleEntity);
    await repository.insert([
      {
        id: 1,
        name: 'Administrador',
      },
      {
        id: 2,
        name: 'Gestor',
      },
      {
        id: 3,
        name: 'Aluno',
      },
    ]);
  }
}
