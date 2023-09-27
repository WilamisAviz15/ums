import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../modules/users/entities/user.entity';

export class UsersSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);
    await repository.insert([
      {
        id: 1,
        name: 'Administrador',
        email: 'adm@nti.ufal.br',
        cpf: '11111111111',
        password:
          '$2b$10$djde7iddrPX7b2aGXOrK5OkkPNaT2h95fy.R613MtSnEThecFJ3Oa',
        register: '11111111',
      },
    ]);
  }
}
