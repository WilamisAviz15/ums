import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';

@Injectable()
export class MenuMealService {
  constructor(@Inject('MEALS') private readonly msMeals: ClientProxy) {}

  getMenusMeals() {
    return this.msMeals.send('get_menus_meals', {});
  }

  getMenusMealsById(id: number) {
    return this.msMeals.send('get_menus_meals_by_id', id);
  }

  getByMealIdAndDate(mealId: number, date: string) {
    return this.msMeals.send('get_menus_meals_by_meal_id_and_date', { mealId, date });
  }

  getByDate(date: string) {
    return this.msMeals.send('get_menus_meals_by_date', { date });
  }

  createMenuMeal(data: MenuMealCreateDto) {
    return this.msMeals.send('create_menu_meal', data);
  }

  updateMenuMeal(data: MenuMealUpdateDto) {
    return this.msMeals.send('update_menu_meal', data);
  }

  deleteMenuMeal(id: number) {
    return this.msMeals.send('delete_menu_meal', id);
  }
}
