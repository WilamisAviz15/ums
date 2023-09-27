import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../modules/users/users.module';
import { UserEntity } from '../modules/users/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationEmailOrCpf } from './validate/authentication-email-or-cpf.constraint';

import { JwtStrategy } from '../providers/authentication/jwt.strategy';
import { ViewMenuByUserRolesEntity } from './entities/view-menu-by-user-roles.entity';
import { ViewPrivilegesByUserRolesEntity } from './entities/view-privileges-by-user-roles.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ViewMenuByUserRolesEntity,
      ViewPrivilegesByUserRolesEntity,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy, AuthenticationService, AuthenticationEmailOrCpf],
  exports: [AuthenticationService, TypeOrmModule, JwtModule],
})
export class AuthenticationModule {}
