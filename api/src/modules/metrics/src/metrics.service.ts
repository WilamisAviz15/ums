import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

@Injectable()
export class MetricService {
  constructor(@Inject('METRICS') private readonly msMetrics: ClientProxy) {}

  getMetrics() {
    return this.msMetrics.send('get_metrics', {});
  }

  getMealsMetrics(dates: string[]) {
    return this.msMetrics.send('get_meals_metrics', dates);
  }
}
