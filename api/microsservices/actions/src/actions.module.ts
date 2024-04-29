import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { DatabaseProviderModule } from './providers/database.provider';
import { ActionEntity } from './entities/action.entity';
import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity]), DatabaseProviderModule],
  controllers: [ActionsController],
  providers: [EnvironmentProviderModule, ActionsService],
})
export class ActionsModule {}
