import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { MealUserRoleInterface } from './interfaces/meal-user-role.interface';
import { MealUserRoleUpdateDto } from './dto/update-meal-user-role.dto';

@Injectable()
export class MealsUserRolesService {
  constructor(@Inject('MEALS') private readonly msMeals: ClientProxy) {}

  getMealsUserRoles() {
    return this.msMeals.send('get_meals_users_roles', {});
  }

  getMealsUserRolesByMealId(id: number) {
    return this.msMeals.send('get_meals_users_roles_by_meal_id', id);
  }

  createMealUserRoles(data: MealUserRoleInterface) {
    return this.msMeals.send('create_meals_users_roles', data);
  }

  updateMealUserRoles(mealId: number, data: MealUserRoleUpdateDto) {
    return this.msMeals.send('update_meals_users_roles', { mealId, data });
  }

  removeMealUserRoles(id: number) {
    return this.msMeals.send('delete_meals_users_roles', id);
  }
}
