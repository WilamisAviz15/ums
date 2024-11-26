import { Controller, Body, ParseIntPipe, Post, Get, Param, Put, Delete } from '@nestjs/common';

import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealInterface } from './interfaces/menu-meal.interface';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';
import { MenuMealService } from './menus-meals.service';

@Controller('menu-meals')
export class MenuMealController {
  constructor(private readonly service: MenuMealService) {}

  @Post()
  create(@Body() data: MenuMealCreateDto): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<MenuMealInterface[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MenuMealInterface> {
    return this.service.findOne(+id);
  }

  @Get(':mealId/:date')
  findByMealIdAndDate(@Param('mealId') mealId: string, @Param('date') date: string): Promise<MenuMealInterface> {
    return this.service.findByMealIdAndDate(+mealId, date);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string): Promise<MenuMealInterface[]> {
    return this.service.findByDate(date);
  }

  @Put(':id')
  update(@Body() data: MenuMealUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    data.id = id;
    return this.service.update(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
