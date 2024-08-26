import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { MealEntity } from './entities/meal.entity';
import { DatabaseProviderModule } from '../../providers/database.provider';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentProviderModule } from '../../environment/environment.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealEntity]),
    DatabaseProviderModule,
    HttpModule,
  ],
  controllers: [MealsController],
  providers: [EnvironmentProviderModule, MealsService],
})
export class MealsModule {}
