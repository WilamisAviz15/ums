import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MealsService } from './meals.service';
import { MealInterface } from './interfaces/meal.interface';
import { MealCreateDto } from './dto/create-meal.dto';
import { MealUpdateDto } from './dto/update-meal.dto';

@Controller('meals')
export class MealsController {
  constructor(private readonly service: MealsService) {}

  @Get()
  async findAll(): Promise<MealInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MealInterface> {
    return await this.service.findOne(+id);
  }

  @Get('date/:date')
  async getMealsByDate(@Param('date') date: string) {
    return await this.service.getMealsByDate(date);
  }

  @Get('count/:mealId')
  async countAllByName(@Param('mealId') mealId: string): Promise<{ almoco: number; jantar: number }> {
    return await this.service.countAllByName(+mealId);
  }

  @Post()
  async create(@Body() data: MealCreateDto): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: MealUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.update(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
