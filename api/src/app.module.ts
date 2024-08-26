import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // DatabaseProviderModule,
    // AuthenticationModule,
    // RolesModule,
    // UsersModule,
    // SchedulesModule,
    // ActionsModule,
    // MenusModule,
    // MenusGroupsModule,
    // MealsModule,
    // ProfileModule,
    // MenuMealModule,
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'ROLES',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'ACTIONS',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
      {
        name: 'MENUS',
        transport: Transport.TCP,
        options: { port: 3004 },
      },
      {
        name: 'PROFILE',
        transport: Transport.TCP,
        options: { port: 3005 },
      },
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: { port: 3006 },
      },
      {
        name: 'MEALS',
        transport: Transport.TCP,
        options: { port: 3007 },
      },
      {
        name: 'SCHEDULES',
        transport: Transport.TCP,
        options: { port: 3008 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, EnvironmentProviderModule],
})
export class AppModule {}
