import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { CommentInterface } from './interfaces/comment.interface';

@Injectable()
export class CommentService {
  constructor(@Inject('COMMENTS') private readonly msComments: ClientProxy) {}

  createComment(data: CommentInterface) {
    return this.msComments.send('create_comment', data);
  }

  findCommentByMenuMealId(menuMealId: number) {
    return this.msComments.send('find_comment_by_menu_meal_id', menuMealId);
  }

  delete(id: number) {
    return this.msComments.send('delete_comment', id);
  }
}
