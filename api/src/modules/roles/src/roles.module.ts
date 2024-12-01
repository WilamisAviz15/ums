import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ROLES',
        transport: Transport.TCP,
        options: { port: 4002 },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
