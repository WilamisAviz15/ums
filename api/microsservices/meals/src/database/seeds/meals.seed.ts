import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MealEntity } from '../../modules/meals/entities/meal.entity';

export class MealsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(MealEntity);
    await repository.insert([{ name: 'Almoço' }, { name: 'Jantar' }]);
  }
}
