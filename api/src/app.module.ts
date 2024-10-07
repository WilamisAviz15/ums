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
import { EnvironmentProviderModule } from './environment/environment.provider';
import { ConfigModule } from './config/config.module';

const configPath = path.join(__dirname,'..', 'src', 'config', 'modules-config.json');

if (!fs.existsSync(configPath)) {
  throw new Error('Arquivo de configuração "modules-config.json" não encontrado.');
}

const moduleConfig = require(configPath);

@Module({
  imports: [
    moduleConfig.AuthenticationModule ? AuthenticationModule : undefined,
    moduleConfig.RoleModule ? RoleModule : undefined,
    moduleConfig.UserModule ? UserModule : undefined,
    moduleConfig.UserRoleModule ? UserRoleModule : undefined,
    moduleConfig.ScheduleModule ? ScheduleModule : undefined,
    moduleConfig.ActionModule ? ActionModule : undefined,
    moduleConfig.MenuModule ? MenuModule : undefined,
    moduleConfig.MenuGroupModule ? MenuGroupModule : undefined,
    moduleConfig.MealModule ? MealModule : undefined,
    moduleConfig.ProfileModule ? ProfileModule : undefined,
    moduleConfig.MenuMealModule ? MenuMealModule : undefined,
    moduleConfig.RatingModule ? RatingModule : undefined,
    moduleConfig.SubMealsModule ? SubMealsModule : undefined,
    moduleConfig.MealsUserRolesModule ? MealsUserRolesModule : undefined,
    moduleConfig.PaymentsModule ? PaymentsModule : undefined,
    ConfigModule
  ].filter(module => module !== undefined),
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
