import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { MealInterface } from './interfaces/meal.interface';
import { MealEntity } from './entities/meal.entity';
import { MealFilterInterface } from './interfaces/meal-filter.interface';
import { createFilters } from '../../utils/typeorm/create-filters.utils';
import { MealCreateDto } from './dto/create-meal.dto';
import { MealUpdateDto } from './dto/update-meal.dto';
import { SubMealEntity } from '../submeals/entities/submeal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealEntity)
    private readonly mealsRepository: Repository<MealEntity>,
    @InjectRepository(SubMealEntity)
    private readonly submealRepository: Repository<SubMealEntity>,
  ) {}

  async findAll(filters?: MealFilterInterface): Promise<MealInterface[]> {
    try {
      const where = createFilters(filters);
      let meals = await this.mealsRepository.find({ where, order: { id: 'ASC' } });
      meals = await Promise.all(
        meals.map(async (meal) => {
          const submeals = await this.submealRepository.find({ where: { mealId: meal.id } });
          meal.submeals = submeals;
          return meal;
        }),
      );

      return meals;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as refeições.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<MealInterface> {
    try {
      return await this.mealsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar a refeição.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: MealCreateDto): Promise<{ meal: MealInterface; message: string }> {
    try {
      const entity = Object.assign(new MealEntity(), data);
      const meal = await this.mealsRepository.save(entity);

      return { meal, message: 'A refeição foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar a refeição.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data: MealUpdateDto): Promise<{ meal: MealInterface; message: string }> {
    try {
      const { id, name } = data;
      const entity = Object.assign(new MealEntity(), {
        id,
        name,
      });
      await this.mealsRepository.save(entity);

      const meal = await this.mealsRepository.findOne({
        where: { id },
      });
      return { meal, message: 'A refeição foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar a ação.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.mealsRepository.delete(id);

      return { message: 'A refeição foi removida com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir a refeição.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByName(name: string, meal: MealInterface): Promise<MealInterface> {
    try {
      const id = meal.id || 0;
      return await this.mealsRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
        select: ['name'],
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar a ação.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
