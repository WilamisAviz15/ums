import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { MealUserRoleInterface } from './interfaces/meal-user-role.interface';
import { MealUserRoleUpdateDto } from './dto/update-meal-user-role.dto';
import { MealsUserRolesService } from './meals-user-roles.service';

@Controller('meals-user-roles')
export class MealsUserRolesController {
  constructor(private readonly service: MealsUserRolesService) {}

  @Get()
  getMealsUserRoles() {
    return this.service.getMealsUserRoles();
  }

  @Get(':id')
  getMealsUserRolesByMealId(@Param('id') id: string) {
    return this.service.getMealsUserRolesByMealId(+id);
  }

  @Post()
  createMealUserRoles(@Body() data: MealUserRoleInterface) {
    return this.service.createMealUserRoles(data);
  }

  @Put(':id')
  async updateMealUserRoles(@Body() data: MealUserRoleUpdateDto, @Param('id', ParseIntPipe) id: number) {
    return this.service.updateMealUserRoles(id, data);
  }

  @Delete(':id')
  removeMealUserRoles(@Param('id') id: string) {
    return this.service.removeMealUserRoles(+id);
  }
}
