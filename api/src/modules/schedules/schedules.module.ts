import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { ScheduleEntity } from './entities/schedule.entity';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    TypeOrmModule.forFeature([ScheduleEntity]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService, UsersService],
})
export class SchedulesModule {}
