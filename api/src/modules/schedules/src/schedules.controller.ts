import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Response } from 'express';

import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedules.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Controller()
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get('schedules/user/:userId')
  getSchedules(@Param('userId') userId: number) {
    return this.service.getSchedules(userId);
  }

  @Get('schedules/:id')
  getSchedulesById(@Param('id') id: string) {
    return this.service.getSchedulesById(+id);
  }

  @Get('schedules/reports/all')
  async getAllReports(@Res() response: Response) {
    try {
      const schedules = await lastValueFrom(this.service.getAllSchedules());
      return this.service.generateScheduleReport(response, schedules);
    } catch (error) {
      return response.status(500).send({ error: 'An error occurred while fetching schedules.' });
    }
  }

  @Get('schedules/metrics/all')
  getSchedulesMetrics() {
    return this.service.getSchedulesMetrics();
  }

  @Get('schedules/date/:date')
  getSchedulesByDate(@Param('date') date: string) {
    return this.service.getSchedulesByDate(date);
  }

  @Patch('schedules/confirm-meal')
  confirmSchedules(@Body() data: ScheduleCreateDto) {
    return this.service.confirmSchedule(data);
  }

  @Get('schedules/cpf/:cpf')
  findByUserCPF(@Param('cpf') cpf?: string) {
    return this.service.findByUserCPF(cpf);
  }

  @Post('schedules')
  createSchedules(@Body() data: ScheduleCreateDto) {
    return this.service.createSchedule(data);
  }

  @Put('schedules/:id')
  async updateSchedules(@Body() data: ScheduleUpdateDto, @Param('id', ParseIntPipe) id: number) {
    data.id = id;
    return this.service.updateSchedule(data);
  }

  @Delete('schedules/:id')
  removeSchedules(@Param('id') id: string) {
    return this.service.deleteSchedule(+id);
  }
}
