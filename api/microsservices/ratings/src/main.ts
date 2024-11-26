import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { RatingsModule } from './ratings.module';

async function bootstrap() {
  const app = await NestFactory.create(RatingsModule);

  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
