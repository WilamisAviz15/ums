import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);

  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
