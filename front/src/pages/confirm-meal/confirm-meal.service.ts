import http from "../../shared/services/axios";
import { ScheduleInterface } from "../schedules/interfaces/schedule.interface";
import { ConfirmMealInterface } from "./interfaces/confirm-meal.interface";

class ConfirmMealService {
  constructor() {}

  async httpGet(cpf: string): Promise<ScheduleInterface[]> {
    return (await http.get<{ cpf: string }, any>(`schedules/cpf/${cpf}`)).data;
  }

  async httpPatch(data: ConfirmMealInterface): Promise<{
    id: number;
    message: string;
  }> {
    return (await http.patch<ConfirmMealInterface, any>(`schedules/confirm-meal/`, { data })).data;
  }
}

export default new ConfirmMealService();
