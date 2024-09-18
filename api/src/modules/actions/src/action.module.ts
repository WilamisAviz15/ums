import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { ActionService } from './action.service';
import { ActionController } from './action.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACTIONS',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
