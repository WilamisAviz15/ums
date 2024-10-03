import { Module } from '@nestjs/common';

import { DatabaseProviderModule } from './providers/database.provider';
import { MealsModule } from './modules/meals/meals.module';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { MenuMealModule } from './modules/menus-meals/menus-meals.module';
import { SubMealsModule } from './modules/submeals/submeal.module';
import { MealUsersRolesModule } from './modules/meals-users-roles/submeals-users-roles.module';

@Module({
  imports: [DatabaseProviderModule, MenuMealModule, MealsModule, SubMealsModule, MealUsersRolesModule],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
