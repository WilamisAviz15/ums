import { Module } from '@nestjs/common';

import { DatabaseProviderModule } from './providers/database.provider';
import { MealsModule } from './modules/meals/meals.module';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { MenuMealModule } from './modules/menus-meals/menus-meals.module';

@Module({
  imports: [DatabaseProviderModule, MenuMealModule, MealsModule],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
