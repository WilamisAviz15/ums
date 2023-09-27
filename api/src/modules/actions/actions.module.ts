import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionEntity } from './entities/action.entity';
import { ActionsMenuEntity } from './entities/actions-menu.entity';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { ActionNameAlreadyExist } from './validate/action-name-already-exist.constraint';
import { MenuEntity } from '../menus/entities/menu.entity';
import { PrivilegeEntity } from '../menus/entities/privilege.entity';
import { AuthenticationModule } from '../../authentication/authentication.module';

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    TypeOrmModule.forFeature([
      ActionEntity,
      ActionsMenuEntity,
      MenuEntity,
      PrivilegeEntity,
    ]),
  ],
  controllers: [ActionsController],
  providers: [ActionsService, ActionNameAlreadyExist],
})
export class ActionsModule {}
