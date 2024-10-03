import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { MealController } from './meals.controller';
import { MealService } from './meals.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEALS',
        transport: Transport.TCP,
        options: { port: 3007 },
      },
    ]),
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
