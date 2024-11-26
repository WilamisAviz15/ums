import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RatingsService } from './ratings.service';
import { RatingInterface } from './interfaces/rating.interface';
import { RatingCreateDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly service: RatingsService) {}

  @Get('findByMenuMealId/:menuMealId')
  async findByMenuMealId(@Param('menuMealId') menuMealId: string): Promise<RatingInterface[]> {
    return await this.service.findByMenuMealId(+menuMealId);
  }

  @Post()
  async create(@Body() data: RatingCreateDto): Promise<{ rating: RatingInterface; message: string }> {
    return await this.service.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
