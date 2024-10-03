import http from "../../shared/services/axios";
import { ScheduleInterface } from "../schedules/interfaces/schedule.interface";
import { RatingInterface } from "./interfaces/rating.interface";

class RatingsService {
  constructor() {}

  async httpGetUsedSchedules(cpf: string): Promise<ScheduleInterface[]> {
    return (await http.get<{ cpf: string }, any>(`schedules/cpf/${cpf}`)).data;
  }

  async httpGetRatingByMenuMealId(menuMealId: number): Promise<RatingInterface[]> {
    return (await http.get<{ ratings: RatingInterface[] }, any>(`ratings/findByMenuMealId/${menuMealId}`)).data;
  }

  async httpPost(data: RatingInterface): Promise<RatingInterface> {
    return (await http.post<RatingInterface, any>(`ratings/`, { data })).data;
  }
}

export default new RatingsService();
