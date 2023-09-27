export interface ScheduleInterface {
  id?: number;
  userId: number;
  mealId: number;
  date: Date;
  used: boolean;
}
