import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { ScheduleController } from './schedules.controller';
import { ScheduleService } from './schedules.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHEDULES',
        transport: Transport.TCP,
        options: { port: 3008 },
      },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
