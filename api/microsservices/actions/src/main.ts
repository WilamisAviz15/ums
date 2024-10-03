import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { ActionsModule } from './actions.module';

async function bootstrap() {
  const app = await NestFactory.create(ActionsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3003 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
