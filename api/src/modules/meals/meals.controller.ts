import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { MealsService } from './meals.service';
import { MealCreateDto } from './dto/create-meal.dto';
import { MealUpdateDto } from './dto/update-meal.dto';
import { Roles } from '../../shared/decorators/role.decorator';
import { MealInterface } from './interfaces/meal.interface';

@Controller('meals')
export class MealsController {
  constructor(private readonly service: MealsService) {}

  @Get()
  @Roles('ACTIONS_LISTAR')
  async findAll(): Promise<MealInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles('ACTIONS_LISTAR')
  async findOne(@Param('id') id: number): Promise<MealInterface> {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles('ACTIONS_INCLUIR')
  async create(
    @Body() data: MealCreateDto,
  ): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  @Roles('ACTIONS_EDITAR')
  async update(
    @Body() data: MealUpdateDto,
    @Param('id') id: number,
  ): Promise<{ meal: MealInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  @Roles('ACTIONS_EXCLUIR')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
