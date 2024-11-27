import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { UsersRolesModule } from './users-roles.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersRolesModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3009,
    },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3000, () => {
    Logger.log(`Listening at http://localhost:${3000}`);
  });
}
bootstrap();
