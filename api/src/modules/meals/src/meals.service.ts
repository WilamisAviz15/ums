import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { MealInterface } from './interfaces/meal.interface';
import { MealUpdateDto } from './dto/update-meal.dto';

@Injectable()
export class MealService {
  constructor(@Inject('MEALS') private readonly msMeals: ClientProxy) {}

  getMeals() {
    return this.msMeals.send('get_meals', {});
  }

  getMealsById(id: number) {
    return this.msMeals.send('get_meals_by_id', id);
  }

  getMealsByDate(date: string) {
    return this.msMeals.send('get_meals_by_date', date);
  }

  createMeal(data: MealInterface) {
    return this.msMeals.send('create_meal', data);
  }

  updateMeal(data: MealUpdateDto) {
    return this.msMeals.send('update_meal', data);
  }

  deleteMeal(id: number) {
    return this.msMeals.send('delete_meal', id);
  }

  countAllByName(mealId: string) {
    return this.msMeals.send('count_all_by_name', mealId);
  }
}
