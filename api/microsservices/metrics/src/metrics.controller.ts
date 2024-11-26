import { Body, Controller, Get, Post } from '@nestjs/common';

import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Get()
  async getMetrics(): Promise<any[]> {
    return await this.service.getMetrics();
  }

  @Post()
  async getMealsMetrics(@Body() dates: string[]) {
    return await this.service.getMealsMetrics(dates);
  }
}
