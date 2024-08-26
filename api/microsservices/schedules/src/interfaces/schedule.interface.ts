import { MealInterface } from './meal.interface';
import { UserInterface } from './user.interface';

export interface ScheduleInterface {
  id?: number;
  userId: number;
  user?: UserInterface;
  mealId: number;
  meal?: MealInterface;
  date: Date;
  used: boolean;
}
