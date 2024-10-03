import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { SubMealEntity } from './entities/submeal.entity';
import { SubMealsController } from './submeal.controller';
import { SubMealsService } from './submeal.service';
import { EnvironmentProviderModule } from '../../environment/environment.provider';
import { DatabaseProviderModule } from '../../providers/database.provider';

@Module({
  imports: [TypeOrmModule.forFeature([SubMealEntity]), DatabaseProviderModule, HttpModule],
  controllers: [SubMealsController],
  providers: [EnvironmentProviderModule, SubMealsService],
})
export class SubMealsModule {}
