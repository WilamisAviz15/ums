import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { UsersService } from './users.service';
import { DatabaseProviderModule } from './providers/database/database.provider';
import { UserCpfAlreadyExist } from './validate/users-cpf-already-exist.constraint';
import { UserEmailAlreadyExist } from './validate/users-email-already-exist.constraint';
import { UserEntity } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseProviderModule,
  ],
  controllers: [UsersController],
  providers: [
    EnvironmentProviderModule,
    UsersService,
    UserEmailAlreadyExist,
    UserCpfAlreadyExist,
  ],
})
export class AppModule {}
