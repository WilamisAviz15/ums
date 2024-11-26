import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { json } from 'express';

import { ActionsModule } from './actions.module';

async function bootstrap() {
  const app = await NestFactory.create(ActionsModule);

  app.enableCors();

  await app.listen(3003, () => {
    Logger.log(`HTTP server running at http://localhost:3003`);
  });
}
bootstrap();
