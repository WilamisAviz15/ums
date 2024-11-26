import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SchedulesService } from './schedules.service';
import { ScheduleInterface, ScheduleMetric } from './interfaces/schedule.interface';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';
import { ScheduleCreateDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get('user/:userId')
  async findAll(@Param('userId') userId: number): Promise<ScheduleInterface[]> {
    return await this.service.findAll(userId);
  }

  @Get('cpf/:cpf')
  async findByUserCPF(@Param('cpf') cpf?: string): Promise<ScheduleInterface[]> {
    return await this.service.findAllByUserCPF(cpf);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScheduleInterface> {
    return await this.service.findOne(+id);
  }

  @Post()
  async create(@Body() data: ScheduleCreateDto): Promise<{ schedule: ScheduleInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Body() data: ScheduleUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<{ schedule: ScheduleInterface; message: string }> {
    data.id = id;
    return await this.service.update(data);
  }

  @Patch('confirm-meal')
  async confirm(@Body() data: ScheduleCreateDto): Promise<{
    id: number;
    message: string;
  }> {
    return await this.service.confirmSchedule(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }

  @Get('metrics/all')
  async getScheduleMetrics(): Promise<ScheduleMetric> {
    return this.service.getScheduleMetrics();
  }

  @Get('date/:date')
  async findAllByDate(@Param('date') date: string) {
    return this.service.findAllByDate(date);
  }
}
