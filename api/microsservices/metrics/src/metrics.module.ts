import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [HttpModule],
  controllers: [MetricsController],
  providers: [EnvironmentProviderModule, MetricsService],
})
export class MetricsModule {}
