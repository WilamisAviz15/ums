import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { MealUserRoleInterface } from './interfaces/meal-user-role.interface';
import { MealUserRoleCreateDto } from './dto/create-meal-user-role.dto';
import { MealUserRoleUpdateDto } from './dto/update-meal-user-role.dto';
import { MealUserRoleService } from './meals-users-roles.service';

@Controller('meals-user-roles')
export class MealUserRoleController {
  constructor(private readonly service: MealUserRoleService) {}

  @Get()
  async findAll(): Promise<MealUserRoleInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getMealsUserRolesByMealId(@Param('id') id: string): Promise<MealUserRoleInterface[]> {
    return await this.service.findOne(+id);
  }

  @Post()
  async create(@Body() data: MealUserRoleCreateDto[]): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: MealUserRoleUpdateDto[], @Param('id', ParseIntPipe) mealId: number): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    return await this.service.update(+mealId, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
