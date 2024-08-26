import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SchedulesService } from './schedules.service';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';
import { ScheduleCreateDto } from './dto/create-schedule.dto';

@Controller()
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @MessagePattern('get_schedules')
  async findAll(userId?: number): Promise<ScheduleInterface[]> {
    return await this.service.findAll(userId);
  }

  @MessagePattern('get_schedules_by_user_cpf')
  async findByUserCPF(cpf?: string): Promise<ScheduleInterface[]> {
    return await this.service.findAllByUserCPF(cpf);
  }

  // async findOne(id: number): Promise<ScheduleInterface> {
  //   return await this.service.findOne(id);
  // }

  @MessagePattern('create_schedules')
  async create(
    @Body() data: ScheduleCreateDto,
  ): Promise<{ schedule: ScheduleInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_schedules')
  async update(
    @Body() data: ScheduleUpdateDto,
  ): Promise<{ schedule: ScheduleInterface; message: string }> {
    return await this.service.update(data);
  }

  @MessagePattern('confirm_schedules')
  async confirm(@Body() data: ScheduleCreateDto): Promise<{
    id: number;
    message: string;
  }> {
    return await this.service.confirmSchedule(data);
  }

  @MessagePattern('delete_schedules')
  async delete(id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
