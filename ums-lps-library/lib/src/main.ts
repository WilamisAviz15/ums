import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(
      `Listening at http://localhost:${process.env.APP_PORT}/${GLOBAL_API_PREFIX}`,
    );
  });
}

bootstrap();
