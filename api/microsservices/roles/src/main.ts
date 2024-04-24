import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { RolesModule } from './roles.module';

async function bootstrap() {
  const app = await NestFactory.create(RolesModule);
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
