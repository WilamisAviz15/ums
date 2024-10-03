import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrivilegeEntity } from './entities/privilege.entity';
import { MenuEntity } from './entities/menu.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenuNameAlreadyExist } from './validate/menus-name-already-exist.contraint';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, PrivilegeEntity])],
  controllers: [MenusController],
  providers: [MenusService, MenuNameAlreadyExist],
  exports: [MenusService],
})
export class MenusModule {}
