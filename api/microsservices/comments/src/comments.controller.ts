import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CommentsService } from './comments.service';
import { CommentInterface } from './interfaces/comment.interface';
import { CommentCreateDto } from './dto/create-comment.dto';

@Controller()
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @MessagePattern('find_comment_by_menu_meal_id')
  async findByMenuMealId(@Body() menuMealId: number): Promise<CommentInterface[]> {
    return await this.service.findByMenuMealId(menuMealId);
  }

  @MessagePattern('create_comment')
  async create(@Body() data: CommentCreateDto): Promise<{ comment: CommentInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('delete_comment')
  async delete(@Body() id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
