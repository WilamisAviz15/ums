import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { RoleNameAlreadyExist } from './validate/role-name-already-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RolesController],
  providers: [RolesService, RoleNameAlreadyExist],
  exports: [RolesService],
})
export class RolesModule {}
