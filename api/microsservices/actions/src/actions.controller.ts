import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { ActionsService } from './actions.service';
import { ActionFilterInterface } from './interfaces/action-filter.interface';
import { ActionInterface } from './interfaces/action.interface';
import { ActionCreateDto } from './dto/create-action.dto';
import { ActionUpdateDto } from './dto/update-action.dto';

@Controller('actions')
export class ActionsController {
  constructor(private readonly service: ActionsService) {}

  @Get()
  async findAll(@Body() filters: ActionFilterInterface): Promise<ActionInterface[]> {
    return await this.service.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ActionInterface> {
    return await this.service.findById();
  }

  @Post()
  async create(@Body() data: ActionCreateDto): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: ActionUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
