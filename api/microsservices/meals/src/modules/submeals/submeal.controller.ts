import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SubMealInterface } from './interfaces/submeal.inteface';
import { SubMealUpdateDto } from './dto/update-submeal.dto';
import { SubMealsService } from './submeal.service';
import { SubMealCreateDto } from './dto/create-submeal.dto';

@Controller('submeals')
export class SubMealsController {
  constructor(private readonly service: SubMealsService) {}

  @MessagePattern('get_submeals')
  async findAll(): Promise<SubMealInterface[]> {
    return await this.service.findAll();
  }

  @MessagePattern('get_submeals_by_id')
  async findOne(@Body() id: number): Promise<SubMealInterface> {
    return await this.service.findOne(id);
  }

  @MessagePattern('get_submeals_by_meal_id')
  async finByMealId(@Body() id: number): Promise<SubMealInterface[]> {
    return await this.service.findByMealId(id);
  }

  @MessagePattern('create_submeal')
  async create(@Body() data: SubMealCreateDto): Promise<{ submeal: SubMealInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_submeal')
  async update(@Body() data: SubMealUpdateDto): Promise<{ submeal: SubMealInterface; message: string }> {
    return await this.service.update(data);
  }

  @MessagePattern('delete_submeal')
  async delete(id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
