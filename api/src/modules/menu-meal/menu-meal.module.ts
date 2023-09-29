import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuMealService } from './menu-meal.service';
import { MenuMealController } from './menu-meal.controller';
import { MenuMealEntity } from './entities/menu-meal.entity';
import { AuthenticationModule } from '../../authentication/authentication.module';

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    TypeOrmModule.forFeature([MenuMealEntity]),
  ],
  controllers: [MenuMealController],
  providers: [MenuMealService],
})
export class MenuMealModule {}
