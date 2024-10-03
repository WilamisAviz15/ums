import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import { SubMealEntity } from './entities/submeal.entity';
import { SubMealInterface } from './interfaces/submeal.inteface';
import { SubMealCreateDto } from './dto/create-submeal.dto';
import { SubMealUpdateDto } from './dto/update-submeal.dto';

export class SubMealsService {
  constructor(
    @InjectRepository(SubMealEntity)
    private readonly subMealsRepository: Repository<SubMealEntity>,
  ) {}

  async findAll(): Promise<SubMealInterface[]> {
    try {
      return await this.subMealsRepository.find({ order: { id: 'ASC' } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as subrefeições.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<SubMealInterface> {
    try {
      return await this.subMealsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar a subrefeição.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByMealId(id: number) {
    try {
      return await this.subMealsRepository.find({ where: { mealId: id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as subrefeições.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: SubMealCreateDto): Promise<{ submeal: SubMealInterface; message: string }> {
    try {
      const entity = Object.assign(new SubMealEntity(), data);
      const submeal = await this.subMealsRepository.save(entity);

      return { submeal, message: 'a subrefeição foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível criar a subrefeição. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data: SubMealUpdateDto): Promise<{ submeal: SubMealInterface; message: string }> {
    try {
      const entity = Object.assign(new SubMealEntity(), data);
      await this.subMealsRepository.save(entity);

      const submeal = await this.subMealsRepository.findOne({
        where: { id: data.id },
      });
      return { submeal, message: 'A subrefeição foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar a subrefeição.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.subMealsRepository.delete(id);

      return { message: 'A subrefeição foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir a subrefeição.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
