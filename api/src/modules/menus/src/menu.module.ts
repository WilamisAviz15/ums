import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

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
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
