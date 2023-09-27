import { Module } from '@nestjs/common';

import { EnvironmentProviderModule } from './environment/environment.provider';
import { DatabaseProviderModule } from './providers/database/database.provider';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ActionsModule } from './modules/actions/actions.module';
import { MenusModule } from './modules/menus/menus.module';
import { MenusGroupsModule } from './modules/menus-groups/menus-groups.module';

@Module({
  imports: [
    DatabaseProviderModule,
    RolesModule,
    UsersModule,
    SchedulesModule,
    ActionsModule,
    MenusModule,
    MenusGroupsModule,
  ],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
