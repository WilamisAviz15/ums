import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { SchedulesService } from './schedules.service';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { Roles } from '../../shared/decorators/role.decorator';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get()
  @Roles('ACTIONS_LISTAR')
  async findAll(): Promise<ScheduleInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles('ACTIONS_LISTAR')
  async findOne(@Param('id') id: number): Promise<ScheduleInterface> {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles('ACTIONS_INCLUIR')
  async create(
    @Body() data: ScheduleCreateDto,
  ): Promise<{ schedule: ScheduleInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  @Roles('ACTIONS_EDITAR')
  async update(
    @Body() data: ScheduleUpdateDto,
    @Param('id') id: number,
  ): Promise<{ schedule: ScheduleInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  @Roles('ACTIONS_EXCLUIR')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
