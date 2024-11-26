import { NestFactory } from '@nestjs/core';

import { PaymentsModule } from './payments.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
