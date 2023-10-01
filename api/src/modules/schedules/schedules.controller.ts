import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { SchedulesService } from './schedules.service';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { Roles } from '../../shared/decorators/role.decorator';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get('user/:userId')
  @Roles('ACTIONS_LISTAR')
  async findAll(
    @Param('userId') userId?: number,
  ): Promise<ScheduleInterface[]> {
    return await this.service.findAll(userId);
  }

  @Get('user/cpf/:cpf')
  @Roles('ACTIONS_LISTAR')
  async findByUserCPF(
    @Param('cpf') cpf?: string,
  ): Promise<ScheduleInterface[]> {
    return await this.service.findAllByUserCPF(cpf);
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

  @Patch('confirm')
  async confirm(@Body() data: ScheduleCreateDto): Promise<{
    id: number;
    message: string;
  }> {
    return await this.service.confirmSchedule(data);
  }

  @Delete(':id')
  @Roles('ACTIONS_EXCLUIR')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
