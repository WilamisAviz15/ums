import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';
import { Response } from 'express';
import { format } from 'date-fns-tz';
import PDFDocument from 'pdfkit';

import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { Observable } from 'rxjs/internal/Observable';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';
import { ScheduleInterface } from './interfaces/schedule.interface';

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

  getAllSchedules() {
    return this.msSchedules.send('get_schedules_all_reports', {});
  }

  private formatDate(date: Date) {
    format(new Date(date), 'dd/MM/yyyy', {
      timeZone: 'America/Sao_Paulo',
    });
  }
  async generateScheduleReport(response: Response, schedules: ScheduleInterface[]): Promise<void> {
    const doc = new PDFDocument({ margin: 30 });

    doc.fontSize(16).text('Relatório de Agendamentos', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text('Data', 50, 100);
    doc.text('Nome do Usuário', 150, 100);
    doc.text('CPF', 300, 100);
    doc.text('Refeição', 400, 100);
    doc.text('Preço', 500, 100);
    doc.moveDown();

    schedules.forEach((schedule, index) => {
      const y = 120 + index * 20;
      doc.text(new Date('2024-10-31T00:00').toLocaleDateString('pt-BR'), 50, y);
      doc.text(schedule.user.name, 150, y);
      doc.text(schedule.user.cpf, 300, y);
      doc.text(schedule.meal?.name, 400, y);
      doc.text(`R$ ${schedule.meal?.price}`, 500, y);
    });

    doc.end();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `attachment; filename=relatorio-agendamentos.pdf`);
    doc.pipe(response);
  }
}
