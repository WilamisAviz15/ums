export interface ScheduleInterface {
  id?: number;
  userId: number;
  // user?: UserInterface;
  mealId: number;
  // meal?: MealInterface;
  date: Date;
  used: boolean;
}
