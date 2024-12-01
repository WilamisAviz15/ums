import { Module } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { AuthenticationModule } from './modules/authentication/src/authentication.module';
import { RoleModule } from './modules/roles/src/roles.module';
import { UserModule } from './modules/users/src/user.module';
import { UserRoleModule } from './modules/users-roles/src/users-roles.module';
import { ScheduleModule } from './modules/schedules/src/schedules.module';
import { ActionModule } from './modules/actions/src/action.module';
import { MenuModule } from './modules/menus/src/menu.module';
import { MenuGroupModule } from './modules/menus-group/src/menus-group.module';
import { MealModule } from './modules/meals/src/meals.module';
import { ProfileModule } from './modules/profile/src/profile.module';
import { MenuMealModule } from './modules/menus-meals/src/menus-meals.module';
import { RatingModule } from './modules/ratings/src/ratings.module';
import { SubMealsModule } from './modules/submeals/src/submeals.module';
import { MealsUserRolesModule } from './modules/meals-user-roles/src/meals-user-roles.module';
import { PaymentsModule } from './modules/payments/src/payments.module';
import { MetricsModule } from './modules/metrics/src/metrics.module';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { ConfigModule } from './config/config.module';

// const configPath = path.join(__dirname, '..', 'src', 'config', 'modules-config.json');
const configPath = path.join(__dirname, 'config', 'modules-config.json');

if (!fs.existsSync(configPath)) {
  throw new Error('Arquivo de configuração "modules-config.json" não encontrado.');
}

const moduleConfig = require(configPath);

@Module({
  imports: [
    moduleConfig.AuthenticationModule.active ? AuthenticationModule : undefined,
    moduleConfig.RoleModule.active ? RoleModule : undefined,
    moduleConfig.UserModule.active ? UserModule : undefined,
    moduleConfig.UserRoleModule.active ? UserRoleModule : undefined,
    moduleConfig.ScheduleModule.active ? ScheduleModule : undefined,
    moduleConfig.ActionModule.active ? ActionModule : undefined,
    moduleConfig.MenuModule.active ? MenuModule : undefined,
    moduleConfig.MenuGroupModule.active ? MenuGroupModule : undefined,
    moduleConfig.MealModule.active ? MealModule : undefined,
    moduleConfig.ProfileModule.active ? ProfileModule : undefined,
    moduleConfig.MenuMealModule.active ? MenuMealModule : undefined,
    moduleConfig.RatingModule.active ? RatingModule : undefined,
    moduleConfig.MealModule.options.multiplo ? SubMealsModule : undefined,
    moduleConfig.MealsUserRolesModule.active ? MealsUserRolesModule : undefined,
    moduleConfig.PaymentsModule.active ? PaymentsModule : undefined,
    moduleConfig.MetricsModule.active ? MetricsModule : undefined,
    ConfigModule,
  ].filter((module) => module !== undefined),
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
