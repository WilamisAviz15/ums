import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3007 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3000, () => {
    Logger.log(`Listening at http://localhost:${3000}`);
  });
}
bootstrap();
