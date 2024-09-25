import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { SubMealInterface } from './interfaces/submeal.interface';
import { SubMealUpdateDto } from './dto/update-submeal.dto';
import { SubMealService } from './submeals.service';

@Controller('submeals')
export class SubMealController {
  constructor(private readonly service: SubMealService) {}

  @Get()
  getSubMeals() {
    return this.service.getSubMeals();
  }

  @Get(':id')
  getSubMealsById(@Param('id') id: string) {
    return this.service.getSubMealsById(+id);
  }

  @Get('byMealId/:id')
  getSubMealsByMealId(@Param('id') id: string) {
    return this.service.getSubMealsByMealId(+id);
  }

  @Post()
  createSubMeal(@Body() data: SubMealInterface) {
    return this.service.createSubMeal(data);
  }

  @Put(':id')
  async updateSubMeal(@Body() data: SubMealUpdateDto, @Param('id', ParseIntPipe) id: number) {
    data.id = id;
    return this.service.updateSubMeal(data);
  }

  @Delete(':id')
  removeSubMeal(@Param('id') id: string) {
    return this.service.deleteSubMeal(+id);
  }
}
