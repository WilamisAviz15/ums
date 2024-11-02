import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { MetricFilterInterface } from './interfaces/metric-filter.interface';
import { environment } from './environment/environment';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { MealInterface } from './interfaces/meal.interface';

@Injectable()
export class MetricsService {
  constructor(private http: HttpService) {}

  async getMetrics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/schedules/metrics/all`).subscribe({
        next: (metrics) => {
          resolve(metrics.data);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async findEntityByField<T>(route: string, dataKey: string, entityKey?: string, fieldValue?: number | string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/${route}`).subscribe({
        next: (response) => {
          const entities = response[dataKey];
          if (fieldValue && entityKey) {
            const entity = entities.find((item) => item[entityKey] === fieldValue);
            resolve(entity);
            return;
          }
          resolve(entities);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  findOrCreateDateMetrics(mealsMetrics: Array<{ date: Date; options: { almoco: number; jantar: number } }>, date: Date) {
    let dateMetric = mealsMetrics.find((metric) => metric.date.getTime() === date.getTime());
    if (!dateMetric) {
      dateMetric = { date: date, options: { almoco: 0, jantar: 0 } };
      mealsMetrics.push(dateMetric);
    }
    return dateMetric;
  }

  async getMealsMetrics(dates: string[]) {
    const mealsMetrics: Array<{ date: Date; options: { almoco: number; jantar: number } }> = [];

    for (const date of dates) {
      const schedules = await this.findEntityByField<ScheduleInterface[]>(`schedules/date/${date}`, 'data');
      const dateMetric = this.findOrCreateDateMetrics(mealsMetrics, new Date(date));

      for (const schedule of schedules) {
        const meal = await this.findEntityByField<any>(`meals/count/${schedule.mealId}`, 'data');
        if (meal.almoco > 0) dateMetric.options.almoco += meal.almoco;
        if (meal.jantar > 0) dateMetric.options.jantar += meal.jantar;
      }
    }

    return mealsMetrics;
  }
}
