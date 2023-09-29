import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { MenuMealService } from './menu-meal.service';
import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';
import { Roles } from '../../shared/decorators/role.decorator';
import { MenuMealInterface } from './interfaces/menu-meal.interface';

@Controller('menu-meal')
export class MenuMealController {
  constructor(private readonly service: MenuMealService) {}

  @Post()
  @Roles('ACTIONS_INCLUIR')
  create(
    @Body() data: MenuMealCreateDto,
  ): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    return this.service.create(data);
  }

  @Get()
  @Roles('ACTIONS_LISTAR')
  findAll(): Promise<MenuMealInterface[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('ACTIONS_LISTAR')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MenuMealInterface> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles('ACTIONS_EDITAR')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MenuMealUpdateDto,
  ): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    return this.service.update(data, id);
  }

  @Delete(':id')
  @Roles('ACTIONS_EXCLUIR')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
