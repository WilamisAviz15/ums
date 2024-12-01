import { Module } from '@nestjs/common/decorators';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices/enums';

import { MenuMealController } from './menus-meals.controller';
import { MenuMealService } from './menus-meals.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEALS',
        transport: Transport.TCP,
        options: { port: 4007 },
      },
    ]),
  ],
  controllers: [MenuMealController],
  providers: [MenuMealService],
})
export class MenuMealModule {}
