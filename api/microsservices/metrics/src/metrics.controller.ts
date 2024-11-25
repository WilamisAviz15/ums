import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MetricsService } from './metrics.service';
import { MetricFilterInterface } from './interfaces/metric-filter.interface';

@Controller()
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @MessagePattern('get_metrics')
  async getMetrics(): Promise<any[]> {
    return await this.service.getMetrics();
  }

  @MessagePattern('get_meals_metrics')
  async getMealsMetrics(@Body() dates: string[]) {
    return await this.service.getMealsMetrics(dates);
  }
}
