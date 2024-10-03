import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { RatingsService } from './ratings.service';
import { RatingInterface } from './interfaces/rating.interface';
import { RatingCreateDto } from './dto/create-rating.dto';

@Controller()
export class RatingsController {
  constructor(private readonly service: RatingsService) {}

  @MessagePattern('find_rating_by_menu_meal_id')
  async findByMenuMealId(@Body() menuMealId: number): Promise<RatingInterface[]> {
    return await this.service.findByMenuMealId(menuMealId);
  }

  @MessagePattern('create_rating')
  async create(@Body() data: RatingCreateDto): Promise<{ rating: RatingInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('delete_rating')
  async delete(@Body() id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
