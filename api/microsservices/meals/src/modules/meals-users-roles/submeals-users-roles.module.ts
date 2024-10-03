import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { DatabaseProviderModule } from '../../providers/database.provider';
import { EnvironmentProviderModule } from '../../environment/environment.provider';
import { MealUserRoleService } from './meals-users-roles.service';
import { MealUserRoleController } from './meals-users-roles.controller';
import { MealUserRoleEntity } from './entities/meals-users-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealUserRoleEntity]), DatabaseProviderModule, HttpModule],
  controllers: [MealUserRoleController],
  providers: [EnvironmentProviderModule, MealUserRoleService],
})
export class MealUsersRolesModule {}
