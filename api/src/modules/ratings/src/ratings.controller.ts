import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common/decorators';

import { RatingInterface } from './interfaces/rating.interface';
import { RatingService } from './ratings.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly service: RatingService) {}

  @Post()
  createRating(@Body() data: RatingInterface) {
    return this.service.createRating(data);
  }

  @Get('findByMenuMealId/:menuMealId')
  findRatingByMenuMealId(@Param('menuMealId') menuMealId: string) {
    return this.service.findRatingByMenuMealId(+menuMealId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
