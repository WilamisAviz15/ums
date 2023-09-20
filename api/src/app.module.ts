import { Module } from '@nestjs/common';

import { EnvironmentProviderModule } from './environment/environment.provider';
import { DatabaseProviderModule } from './providers/database/database.provider';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseProviderModule, UsersModule, SchedulesModule],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
