import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationModule } from '../../authentication/authentication.module';
import { MealEntity } from './entities/meal.entity';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { MealNameAlreadyExist } from './validate/meal-name-already-exist.constraint';

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    TypeOrmModule.forFeature([MealEntity]),
  ],
  controllers: [MealsController],
  providers: [MealsService, MealNameAlreadyExist],
})
export class MealsModule {}
