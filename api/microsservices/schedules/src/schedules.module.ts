import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { ScheduleEntity } from './entities/schedule.entity';
import { DatabaseProviderModule } from './providers/database.provider';
import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity]),
    DatabaseProviderModule,
    HttpModule,
  ],
  controllers: [SchedulesController],
  providers: [EnvironmentProviderModule, SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
