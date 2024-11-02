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

export interface ScheduleMetric {
  total: number;
  totalToday: number;
  totalTodayPaid: number;
  totalTodayUnpaid: number;
  totalPaid: number;
  totalNotPaid: number;
}
