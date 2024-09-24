import http from "../../shared/services/axios";
import { ScheduleInterface } from "../schedules/interfaces/schedule.interface";

class RatingsService {
  constructor() {}

  async httpGetUsedSchedules(cpf: string): Promise<ScheduleInterface[]> {
    return (await http.get<{ cpf: string }, any>(`schedules/cpf/${cpf}`)).data;
  }
}

export default new RatingsService();
