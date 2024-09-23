import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { DatabaseProviderModule } from './providers/database.provider';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { RatingEntity } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity]), DatabaseProviderModule, HttpModule],
  controllers: [RatingsController],
  providers: [EnvironmentProviderModule, RatingsService],
})
export class RatingsModule {}
