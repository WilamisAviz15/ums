import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export class UsersRolesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into('users_roles')
      .values([
        {
          id: 1,
          user_id: 1,
          role_id: 1,
        },
      ])
      .execute();
  }
}
