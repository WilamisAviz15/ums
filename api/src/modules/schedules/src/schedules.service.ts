import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { Observable } from 'rxjs/internal/Observable';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(@Inject('SCHEDULES') private readonly msSchedules: ClientProxy) {}

  getSchedules(userId: number) {
    return this.msSchedules.send('get_schedules', userId);
  }

  getSchedulesById(id: number) {
    return this.msSchedules.send('get_schedules_by_id', id);
  }

  createSchedule(createUserRequest: ScheduleCreateDto): Observable<any> {
    return this.msSchedules.send('create_schedules', createUserRequest);
  }

  updateSchedule(data: ScheduleUpdateDto) {
    return this.msSchedules.send('update_schedules', data);
  }

  deleteSchedule(id: number) {
    return this.msSchedules.send('delete_schedules', id);
  }

  confirmSchedule(data: ScheduleCreateDto) {
    return this.msSchedules.send('confirm_schedules', data);
  }

  getSchedulesMetrics() {
    return this.msSchedules.send('get_schedules_metrics', {});
  }

  findByUserCPF(cpf: string) {
    return this.msSchedules.send('get_schedules_by_user_cpf', cpf);
  }

  getSchedulesByDate(date: string) {
    return this.msSchedules.send('get_schedules_by_date', date);
  }
}
