import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { SubMealInterface } from './interfaces/submeal.interface';
import { SubMealUpdateDto } from './dto/update-submeal.dto';

@Injectable()
export class SubMealService {
  constructor(@Inject('MEALS') private readonly msMeals: ClientProxy) {}

  getSubMeals() {
    return this.msMeals.send('get_submeals', {});
  }

  getSubMealsById(id: number) {
    return this.msMeals.send('get_submeals_by_id', id);
  }

  getSubMealsByMealId(id: number) {
    return this.msMeals.send('get_submeals_by_meal_id', id);
  }

  createSubMeal(data: SubMealInterface) {
    return this.msMeals.send('create_submeal', data);
  }

  updateSubMeal(data: SubMealUpdateDto) {
    return this.msMeals.send('update_submeal', data);
  }

  deleteSubMeal(id: number) {
    return this.msMeals.send('delete_submeal', id);
  }
}
