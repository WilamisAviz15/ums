import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionEntity } from '../actions/entities/action.entity';
import { ActionsMenuEntity } from '../actions/entities/actions-menu.entity';
import { PrivilegeEntity } from './entities/privilege.entity';
import { MenuEntity } from './entities/menu.entity';

import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

import { MenuNameAlreadyExist } from './validate/menus-name-already-exist.contraint';

@Module({
  imports: [
    // AuthenticationModule,
    TypeOrmModule.forFeature([
      ActionEntity,
      ActionsMenuEntity,
      MenuEntity,
      PrivilegeEntity,
    ]),
  ],
  controllers: [MenusController],
  providers: [MenusService, MenuNameAlreadyExist],
  exports: [MenusService],
})
export class MenusModule {}
