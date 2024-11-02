import { Body, Controller, Get, Post } from '@nestjs/common/decorators';
import { MetricService } from './metrics.service';

@Controller()
export class MetricController {
  constructor(private readonly service: MetricService) {}

  @Get('metrics')
  getMetrics() {
    return this.service.getMetrics();
  }

  @Post('metrics')
  getMealsMetrics(@Body() dates: string[]) {
    return this.service.getMealsMetrics(dates);
  }
}
