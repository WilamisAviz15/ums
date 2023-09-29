import { MealInterface } from 'src/modules/meals/interfaces/meal.interface';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';

export interface ScheduleInterface {
  id?: number;
  userId: number;
  user?: UserInterface;
  mealId: number;
  meal?: MealInterface;
  date: Date;
  used: boolean;
}
