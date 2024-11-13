import { Body, Controller } from '@nestjs/common';
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

  @MessagePattern('get_meals_by_id')
  async findOne(@Body() id: number): Promise<MealInterface> {
    return await this.service.findOne(id);
  }

  @MessagePattern('get_meals_by_date')
  async getMealsByDate(date: string) {
    return await this.service.getMealsByDate(date);
  }

  @MessagePattern('count_all_by_name')
  async countAllByName(@Body() id: number): Promise<{ almoco: number; jantar: number }> {
    return await this.service.countAllByName(id);
  }

  @MessagePattern('create_meal')
  async create(@Body() data: MealCreateDto): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_meal')
  async update(@Body() data: MealUpdateDto): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.update(data);
  }

  @MessagePattern('delete_meal')
  async delete(id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
