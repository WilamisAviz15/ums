import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';
import { MenuMealService } from './menus-meals.service';

@Controller()
export class MenuMealController {
  constructor(private readonly service: MenuMealService) {}

  @Get('menu-meals')
  getMenusMeals() {
    return this.service.getMenusMeals();
  }

  @Get('menu-meals/:id')
  getMenusMealsById(@Param('id') id: string) {
    return this.service.getMenusMealsById(+id);
  }

  @Post('menu-meals')
  createMenuMeals(@Body() data: MenuMealCreateDto) {
    return this.service.createMenuMeal(data);
  }

  @Put('menu-meals/:id')
  async updateMenuMeals(@Body() data: MenuMealUpdateDto, @Param('id', ParseIntPipe) id: number) {
    data.id = id;
    return this.service.updateMenuMeal(data);
  }

  @Delete('menu-meals/:id')
  removeMenuMeals(@Param('id') id: string) {
    return this.service.deleteMenuMeal(+id);
  }
}
