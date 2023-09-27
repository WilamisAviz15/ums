import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleFilterInterface } from './interfaces/schedule-filter.interface';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { ScheduleUpdateDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly schedulesRepository: Repository<ScheduleEntity>,
  ) {}

  async findAll(
    filters?: ScheduleFilterInterface,
  ): Promise<ScheduleInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.schedulesRepository.find({
        where,
        order: { id: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o agendamento.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ScheduleInterface> {
    try {
      return await this.schedulesRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o agendamento.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: ScheduleCreateDto,
  ): Promise<{ schedule: ScheduleInterface; message: string }> {
    try {
      console.log(data);

      const entity = Object.assign(new ScheduleEntity(), data);
      const schedule = await this.schedulesRepository.save(entity);

      return { schedule, message: 'O agendamento foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o agendamento.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    data: ScheduleUpdateDto,
    id: number,
  ): Promise<{ schedule: ScheduleInterface; message: string }> {
    try {
      const entity = Object.assign(new ScheduleEntity(), data);
      await this.schedulesRepository.save(entity);

      const schedule = await this.schedulesRepository.findOne({
        where: { id },
      });
      return { schedule, message: 'O agendamento foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o agendamento.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.schedulesRepository.delete(id);

      return { message: 'o agendamento foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o agendamento.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
