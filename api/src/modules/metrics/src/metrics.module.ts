import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { MetricController } from './metrics.controller';
import { MetricService } from './metrics.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'METRICS',
        transport: Transport.TCP,
        options: { port: 3013 },
      },
    ]),
  ],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricsModule {}
