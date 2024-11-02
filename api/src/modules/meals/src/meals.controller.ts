import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { MealInterface } from './interfaces/meal.interface';
import { MealUpdateDto } from './dto/update-meal.dto';
import { MealService } from './meals.service';

@Controller()
export class MealController {
  constructor(private readonly service: MealService) {}

  @Get('meals')
  getMeals() {
    return this.service.getMeals();
  }

  @Get('meals/:id')
  getMealsById(@Param('id') id: string) {
    return this.service.getMealsById(+id);
  }

  @Post('meals')
  createMeal(@Body() data: MealInterface) {
    return this.service.createMeal(data);
  }

  @Put('meals/:id')
  async updateMeal(@Body() data: MealUpdateDto, @Param('id', ParseIntPipe) id: number) {
    data.id = id;
    return this.service.updateMeal(data);
  }

  @Delete('meals/:id')
  removeMeal(@Param('id') id: string) {
    return this.service.deleteMeal(+id);
  }

  @Get('meals/count/:mealId')
  countAllByName(@Param('mealId') mealId: string) {
    return this.service.countAllByName(mealId);
  }
}
