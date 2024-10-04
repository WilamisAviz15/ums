import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { MealEntity } from './entities/meal.entity';
import { DatabaseProviderModule } from '../../providers/database.provider';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentProviderModule } from '../../environment/environment.provider';
import { SubMealEntity } from '../submeals/entities/submeal.entity';
import { MealUserRoleEntity } from '../meals-users-roles/entities/meals-users-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealEntity, SubMealEntity, MealUserRoleEntity]), DatabaseProviderModule, HttpModule],
  controllers: [MealsController],
  providers: [EnvironmentProviderModule, MealsService],
})
export class MealsModule {}
