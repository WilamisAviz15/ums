import { Injectable } from '@nestjs/common';
import { MealInterface } from './interfaces/meal.interface';

@Injectable()
export class MealsService {
  async findByName(name: string, meal: MealInterface) {
    return null;
  }
}
