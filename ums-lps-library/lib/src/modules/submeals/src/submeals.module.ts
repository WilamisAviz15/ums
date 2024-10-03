import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { SubMealController } from './submeals.controller';
import { SubMealService } from './submeals.service';

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
  controllers: [SubMealController],
  providers: [SubMealService],
})
export class SubMealsModule {}
