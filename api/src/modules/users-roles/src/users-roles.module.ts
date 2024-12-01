import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { UserRoleController } from './users-roles.controller';
import { UserRoleService } from './users-roles.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_ROLES',
        transport: Transport.TCP,
        options: { port: 4009 },
      },
    ]),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
