import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { DatabaseProviderModule } from './providers/database.provider';
import { ActionEntity } from './entities/action.entity';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { ActionsMenuEntity } from './entities/actions-menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionEntity, ActionsMenuEntity]),
    DatabaseProviderModule,
    HttpModule,
  ],
  controllers: [ActionsController],
  providers: [EnvironmentProviderModule, ActionsService],
})
export class ActionsModule {}
