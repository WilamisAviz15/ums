import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { ViewMenuByUserRolesEntity } from './entities/view-menu-by-user-roles.entity';
import { ViewPrivilegesByUserRolesEntity } from './entities/view-privileges-by-user-roles.entity';
import { JwtStrategy } from './providers/authentication/jwt.strategy';
import { DatabaseProviderModule } from './providers/database/database.provider';

@Module({
  imports: [
    HttpModule,
    DatabaseProviderModule,
    TypeOrmModule.forFeature([
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
  providers: [JwtStrategy, EnvironmentProviderModule, AuthenticationService],
  exports: [TypeOrmModule],
})
export class AuthenticationModule {}
