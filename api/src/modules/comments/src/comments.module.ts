import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENTS',
        transport: Transport.TCP,
        options: { port: 3010 },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
