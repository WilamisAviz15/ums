export interface ScheduleInterface {
  id?: number;
  userId: number;
  user?: any;
  mealId: number;
  meal?: any;
  date: Date;
  used: boolean;
  paid: boolean;
}
