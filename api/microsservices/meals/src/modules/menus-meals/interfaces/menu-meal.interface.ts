import { MealEntity } from '../../../modules/meals/entities/meal.entity';

export interface MenuMealInterface {
  id: number;
  name: string;
  date: Date;
  description: string;
  mealId: number;
  meal?: MealEntity;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
