import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.enableCors();
  const configService = new ConfigService();
  process.env.TZ = configService.get<string>('TIMEZONE') || 'America/Sao_Paulo';
  await app.listen(3333, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:3333/${GLOBAL_API_PREFIX}`);
  });
}

bootstrap();
