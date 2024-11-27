import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { PaymentController } from './payments.controller';
import { PaymentService } from './payments.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENTS',
        transport: Transport.TCP,
        options: { port: 4011 },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentsModule {}
