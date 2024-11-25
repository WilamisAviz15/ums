import { endOfWeek, startOfWeek } from "date-fns";

import http from "../../shared/services/axios";
import { MealMetric } from "./interfaces/meals-metrics.interface";
import { MetricInterface } from "./interfaces/metric.interface";

class MenusGroupsService {
  constructor() {
    this.getMetricsToChartBar();
  }

  async httpGet(): Promise<MetricInterface> {
    return (await http.get<MetricInterface, any>("metrics")).data;
  }

  async httpPost(data: string[]): Promise<MealMetric[]> {
    const response = await http.post<any, any>("metrics", { data });
    return response.data;
  }

  async getMetricsToChartBar() {
    const date = new Date();
    const dateArray: string[] = [];
    const startDate = startOfWeek(date, { weekStartsOn: 1 });
    const endDate = endOfWeek(date, { weekStartsOn: 0 });

    let currentDate = startDate;

    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // console.log(dateArray);
    try {
      return await this.httpPost(dateArray);
    } catch (error) {
      console.error(`Erro ao enviar para a data: ${currentDate}`, error);
      return [];
    }
  }
}

export default new MenusGroupsService();
