import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { DatabaseProviderModule } from './providers/database.provider';
import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [TypeOrmModule.forFeature([]), DatabaseProviderModule, HttpModule],
  controllers: [CommentsController],
  providers: [EnvironmentProviderModule, CommentsService],
})
export class CommentsModule {}
