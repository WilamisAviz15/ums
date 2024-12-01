import http from "../../shared/services/axios";
import { ScheduleInterface } from "../schedules/interfaces/schedule.interface";

class ReportsService {
  constructor() {}

  async httpGetAllReports(): Promise<any> {
    return (await http.get<any, any>(`schedules/reports/all`, { config: { responseType: "blob" } })).data;
  }
}

export default new ReportsService();
