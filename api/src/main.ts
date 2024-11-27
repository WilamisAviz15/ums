import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.enableCors();
  await app.listen(3333, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:3333/${GLOBAL_API_PREFIX}`);
  });
}

bootstrap();
