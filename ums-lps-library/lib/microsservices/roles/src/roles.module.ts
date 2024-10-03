import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { RoleNameAlreadyExist } from './validate/role-name-already-exist.constraint';
import { DatabaseProviderModule } from './providers/database.provider';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), DatabaseProviderModule],
  controllers: [RolesController],
  providers: [EnvironmentProviderModule, RolesService, RoleNameAlreadyExist],
  exports: [RolesService],
})
export class RolesModule {}
