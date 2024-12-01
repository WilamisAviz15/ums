import { Module } from '@nestjs/common/decorators';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices/enums';

import { MenuGroupController } from './menus-group.controller';
import { MenuGroupService } from './menus-group.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MENUS',
        transport: Transport.TCP,
        options: { port: 4004 },
      },
    ]),
  ],
  controllers: [MenuGroupController],
  providers: [MenuGroupService],
})
export class MenuGroupModule {}
