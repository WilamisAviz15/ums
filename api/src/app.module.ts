import { Module } from '@nestjs/common';

import { EnvironmentProviderModule } from './environment/environment.provider';
import { DatabaseProviderModule } from './providers/database/database.provider';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ActionsModule } from './modules/actions/actions.module';
import { MenusModule } from './modules/menus/menus.module';
import { MenusGroupsModule } from './modules/menus-groups/menus-groups.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MealsModule } from './modules/meals/meals.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MenuMealModule } from './modules/menu-meal/menu-meal.module';

@Module({
  imports: [
    DatabaseProviderModule,
    AuthenticationModule,
    RolesModule,
    UsersModule,
    SchedulesModule,
    ActionsModule,
    MenusModule,
    MenusGroupsModule,
    MealsModule,
    ProfileModule,
    MenuMealModule,
  ],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
