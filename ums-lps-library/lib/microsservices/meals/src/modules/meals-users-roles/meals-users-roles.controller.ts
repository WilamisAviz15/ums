import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MealUserRoleInterface } from './interfaces/meal-user-role.interface';
import { MealUserRoleCreateDto } from './dto/create-meal-user-role.dto';
import { MealUserRoleUpdateDto } from './dto/update-meal-user-role.dto';
import { MealUserRoleService } from './meals-users-roles.service';

@Controller()
export class MealUserRoleController {
  constructor(private readonly service: MealUserRoleService) {}

  @MessagePattern('get_meals_users_roles')
  async findAll(): Promise<MealUserRoleInterface[]> {
    return await this.service.findAll();
  }

  @MessagePattern('get_meals_users_roles_by_meal_id')
  async findOne(@Body() id: number): Promise<MealUserRoleInterface[]> {
    return await this.service.findOne(id);
  }

  @MessagePattern('create_meals_users_roles')
  async create(@Body() data: MealUserRoleCreateDto[]): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_meals_users_roles')
  async update(@Body() { mealId, data }: { mealId: number; data: MealUserRoleUpdateDto[] }): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    return await this.service.update(mealId, data);
  }

  @MessagePattern('delete_meals_users_roles')
  async delete(id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
