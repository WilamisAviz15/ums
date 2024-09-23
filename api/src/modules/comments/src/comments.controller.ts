import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';

import { CommentInterface } from './interfaces/comment.interface';
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  createComment(@Body() data: CommentInterface) {
    return this.service.createComment(data);
  }

  @Get('findByMenuMealId/:menuMealId')
  findCommentByMenuMealId(@Param('menuMealId') menuMealId: string) {
    return this.service.findCommentByMenuMealId(+menuMealId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
