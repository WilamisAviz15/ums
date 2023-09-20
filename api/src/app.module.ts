import { Module } from '@nestjs/common';

import { EnvironmentProviderModule } from './environment/environment.provider';
import { DatabaseProviderModule } from './providers/database/database.provider';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [DatabaseProviderModule, UsersModule, SchedulesModule, RolesModule],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
