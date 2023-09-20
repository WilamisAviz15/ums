import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { UserEmailAlreadyExist } from './validate/users-email-already-exist.constraint';
import { UserCpfAlreadyExist } from './validate/users-cpf-already-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserEmailAlreadyExist, UserCpfAlreadyExist],
  exports: [UsersService, UserEmailAlreadyExist],
})
export class UsersModule {}
