import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { CommentsModule } from './comments.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3010 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
