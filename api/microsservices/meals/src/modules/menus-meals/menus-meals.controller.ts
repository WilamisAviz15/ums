import { Controller, Body, ParseIntPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealInterface } from './interfaces/menu-meal.interface';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';
import { MenuMealService } from './menus-meals.service';

@Controller('menu-meals')
export class MenuMealController {
  constructor(private readonly service: MenuMealService) {}

  @MessagePattern('create_menu_meal')
  create(
    @Body() data: MenuMealCreateDto,
  ): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    return this.service.create(data);
  }

  @MessagePattern('get_menus_meals')
  findAll(): Promise<MenuMealInterface[]> {
    console.log('>>>');
    return this.service.findAll();
  }

  @MessagePattern('update_menu_meal')
  update(
    @Body() data: MenuMealUpdateDto,
  ): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    return this.service.update(data);
  }

  @MessagePattern('delete_menu_meal')
  remove(id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
