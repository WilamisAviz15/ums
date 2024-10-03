import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { RatingService } from './ratings.service';
import { RatingController } from './ratings.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RATINGS',
        transport: Transport.TCP,
        options: { port: 3010 },
      },
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
