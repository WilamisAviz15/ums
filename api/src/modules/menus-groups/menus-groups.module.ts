import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenusGroupEntity } from './entities/menus-group.entity';
import { MenusGroupsController } from './menus-groups.controller';
import { MenusGroupsService } from './menus-groups.service';
import { MenusGroupNameAlreadyExistConstraint } from './validate/menus-group-name-already-exist.constraint';

@Module({
  imports: [
    // AuthenticationModule,
    TypeOrmModule.forFeature([MenusGroupEntity]),
  ],
  controllers: [MenusGroupsController],
  providers: [MenusGroupsService, MenusGroupNameAlreadyExistConstraint],
})
export class MenusGroupsModule {}
