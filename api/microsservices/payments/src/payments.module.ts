import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { EnvironmentProviderModule } from './environment/environment.provider';
import { PaymentEntity } from './entities/payment.entity';
import { DatabaseProviderModule } from './providers/database.provider';
import { TransactionTypeEntity } from './entities/transaction-type.entity';
import { TransactionEntity } from './entities/transaction.entity';

@Module({
  imports: [HttpModule, DatabaseProviderModule, TypeOrmModule.forFeature([PaymentEntity, TransactionTypeEntity, TransactionEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService, EnvironmentProviderModule],
})
export class PaymentsModule {}
