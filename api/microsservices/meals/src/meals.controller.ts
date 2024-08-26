import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MealsService } from './meals.service';
import { MealInterface } from './interfaces/meal.interface';
import { MealCreateDto } from './dto/create-meal.dto';
import { MealUpdateDto } from './dto/update-meal.dto';

@Controller()
export class MealsController {
  constructor(private readonly service: MealsService) {}

  @MessagePattern('get_meals')
  async findAll(): Promise<MealInterface[]> {
    return await this.service.findAll();
  }

  @MessagePattern('get_meal')
  async findOne(@Param('id') id: number): Promise<MealInterface> {
    return await this.service.findOne(id);
  }

  @MessagePattern('create_meal')
  async create(
    @Body() data: MealCreateDto,
  ): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_meal')
  async update(
    @Body() data: MealUpdateDto,
  ): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.update(data);
  }

  @MessagePattern('delete_meal')
  async delete(id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
