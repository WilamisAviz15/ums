import { Subscription } from "rxjs";
import http from "../../shared/services/axios";
import authService from "../auth/auth.service";
import { ScheduleInterface } from "./interfaces/schedule.interface";

class SchedulesService {
  user: any;

  constructor() {
    authService.getUser$().subscribe((user) => (this.user = user));
  }

  async httpGet(): Promise<any> {
    return await http.get<ScheduleInterface, any>(`schedules/user/${this.user.id}`);
  }

  async httpGetById(id: number): Promise<ScheduleInterface> {
    return (await http.get<any, any>(`schedules/${id}`)).data;
  }

  async httpPost(data: ScheduleInterface): Promise<{ action: ScheduleInterface; message: string }> {
    const response = await http.post<ScheduleInterface, any>("schedules", { data });
    return response.data;
  }

  async httpPut(data: ScheduleInterface): Promise<{ action: ScheduleInterface; message: string }> {
    const response = await http.put<ScheduleInterface, any>(`schedules/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`schedules/${id}`, {});
    return response.data;
  }
}

export default new SchedulesService();
