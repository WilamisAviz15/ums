import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SubMealInterface } from './interfaces/submeal.inteface';
import { SubMealUpdateDto } from './dto/update-submeal.dto';
import { SubMealsService } from './submeal.service';
import { SubMealCreateDto } from './dto/create-submeal.dto';

@Controller('submeals')
export class SubMealsController {
  constructor(private readonly service: SubMealsService) {}

  @Get()
  async findAll(): Promise<SubMealInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubMealInterface> {
    return await this.service.findOne(id);
  }

  @Get('byMealId/:id')
  async finByMealId(@Param('id') id: string): Promise<SubMealInterface[]> {
    return await this.service.findByMealId(+id);
  }

  @Post()
  async create(@Body() data: SubMealCreateDto): Promise<{ submeal: SubMealInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: SubMealUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ submeal: SubMealInterface; message: string }> {
    data.id = id;
    return await this.service.update(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
