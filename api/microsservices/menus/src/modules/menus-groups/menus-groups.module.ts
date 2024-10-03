import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenusGroupsController } from './menus-groups.controller';
import { MenusGroupsService } from './menus-groups.service';
import { MenusGroupEntity } from './entities/menus-group.entity';
import { MenusGroupNameAlreadyExistConstraint } from './validate/menus-group-name-already-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([MenusGroupEntity])],
  controllers: [MenusGroupsController],
  providers: [MenusGroupNameAlreadyExistConstraint, MenusGroupsService],
})
export class MenusGroupsModule {}
