import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { UsersRolesController } from './users-roles.controller';
import { UsersRolesService } from './users-roles.service';
import { DatabaseProviderModule } from './providers/database/database.provider';
import { UserRoleEntity } from './entities/user-role.entity';
import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserRoleEntity]), DatabaseProviderModule],
  controllers: [UsersRolesController],
  providers: [EnvironmentProviderModule, UsersRolesService],
})
export class UsersRolesModule {}
