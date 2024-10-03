import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleFilterInterface } from './interfaces/schedule-filter.interface';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { createFilters } from './utils/typeorm/create-filters.utils';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';
import { environment } from './environment/environment';
import { UserInterface } from './interfaces/user.interface';
import { MealInterface } from './interfaces/meal.interface';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly schedulesRepository: Repository<ScheduleEntity>,

    private readonly http: HttpService,
  ) {}

  async findAll(userId?: number, filters?: ScheduleFilterInterface): Promise<ScheduleInterface[]> {
    try {
      const schedules = await this.schedulesRepository.find({
        where: { userId },
        order: { id: 'ASC' },
      });

      const filledSchedules = await Promise.all(
        schedules.map(async (schedule) => {
          const user = await this.findEntityByField<UserInterface>(schedule.userId, 'users', 'data', 'id');
          const meal = await this.findEntityByField<MealInterface>(schedule.mealId, 'meals', 'data', 'id');
          schedule.user = user;
          schedule.meal = meal;

          return schedule;
        }),
      );

      return filledSchedules;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os agendamentos.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<ScheduleInterface> {
    try {
      return await this.schedulesRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o agendamento.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByUserId(userId: number, filters?: ScheduleFilterInterface): Promise<ScheduleInterface[]> {
    try {
      const schedules = await this.schedulesRepository.find({
        where: { userId },
        order: { id: 'ASC' },
      });

      const filledSchedules = await Promise.all(
        schedules.map(async (schedule) => {
          const user = await this.findEntityByField<UserInterface>(schedule.userId, 'users', 'data', 'id');
          const meal = await this.findEntityByField<MealInterface>(schedule.mealId, 'meals', 'data', 'id');
          schedule.user = user;
          schedule.meal = meal;

          return schedule;
        }),
      );

      return filledSchedules;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os agendamentos.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByUserCPF(cpf: string): Promise<ScheduleInterface[]> {
    const user = await this.findEntityByField<UserInterface>(cpf, 'users', 'data', 'cpf');
    if (!user) return [];

    try {
      const schedules = await this.schedulesRepository.find({
        where: { userId: user.id },
        order: { id: 'ASC' },
      });
      const filledSchedules = await Promise.all(
        schedules.map(async (schedule) => {
          const user = await this.findEntityByField<UserInterface>(schedule.userId, 'users', 'data', 'id');
          const meal = await this.findEntityByField<MealInterface>(schedule.mealId, 'meals', 'data', 'id');

          schedule.user = user;
          schedule.meal = meal;

          return schedule;
        }),
      );

      return filledSchedules;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os agendamentos.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findEntityByField<T>(fieldValue: number | string, route: string, dataKey: string, entityKey: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/${route}`).subscribe({
        next: (response) => {
          const entities = response[dataKey];
          const entity = entities.find((item) => item[entityKey] === fieldValue);
          resolve(entity);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async confirmSchedule(data: ScheduleCreateDto): Promise<{
    id: number;
    message: string;
  }> {
    const { date, mealId, userId } = data;
    try {
      const schedule = await this.schedulesRepository.findOne({
        where: { userId, mealId, date },
        order: { id: 'ASC' },
      });

      schedule.used = true;
      const entity = Object.assign(new ScheduleEntity(), schedule);
      await this.schedulesRepository.save(entity);

      return {
        id: schedule.id,
        message: 'O agendamento foi atualizado com sucesso.',
      };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar o agendamento.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: ScheduleCreateDto): Promise<{ schedule: ScheduleInterface; message: string }> {
    try {
      const entity = Object.assign(new ScheduleEntity(), {
        userId: data.userId,
        mealId: data.mealId,
        date: data.date,
      });
      const schedule = await this.schedulesRepository.save(entity);

      return { schedule, message: 'O agendamento foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível criar o agendamento. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data: ScheduleUpdateDto): Promise<{ schedule: ScheduleInterface; message: string }> {
    try {
      const entity = Object.assign(new ScheduleEntity(), data);
      await this.schedulesRepository.save(entity);

      const schedule = await this.schedulesRepository.findOne({
        where: { id: data.id },
      });
      return { schedule, message: 'O agendamento foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar o agendamento.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.schedulesRepository.delete(id);

      return { message: 'o agendamento foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o agendamento.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
