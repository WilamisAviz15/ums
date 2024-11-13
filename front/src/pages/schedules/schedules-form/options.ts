import { ScheduleInterface } from "../interfaces/schedule.interface";

export const initialForm: ScheduleInterface = {
  date: new Date(),
  mealId: 0,
  used: false,
  paid: false,
  userId: 9999,
  id: 0,
  meal: [],
  user: [],
};
