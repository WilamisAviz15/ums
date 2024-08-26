import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuMealEntity } from './entities/menu-meal.entity';
import { MenuMealController } from './menus-meals.controller';
import { MenuMealService } from './menus-meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuMealEntity])],
  controllers: [MenuMealController],
  providers: [MenuMealService],
})
export class MenuMealModule {}
