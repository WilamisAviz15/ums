import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserRoleEntity } from '../../entities/user-role.entity';

export class UsersRolesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(UserRoleEntity);
    await repository.insert([
      {
        id: 1,
        userId: 1,
        roleId: 1,
      },
    ]);
  }
}
