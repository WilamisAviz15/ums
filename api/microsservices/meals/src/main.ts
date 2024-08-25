import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { MealsModule } from './meals.module';

async function bootstrap() {
  const app = await NestFactory.create(MealsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3007 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
