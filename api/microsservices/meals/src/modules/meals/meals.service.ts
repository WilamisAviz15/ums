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
import { MealUserRoleEntity } from '../meals-users-roles/entities/meals-users-roles.entity';
import { MenuMealEntity } from '../menus-meals/entities/menu-meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealEntity)
    private readonly mealsRepository: Repository<MealEntity>,
    @InjectRepository(MenuMealEntity)
    private readonly menuMealsRepository: Repository<MenuMealEntity>,
    @InjectRepository(SubMealEntity)
    private readonly submealRepository: Repository<SubMealEntity>,
    @InjectRepository(MealUserRoleEntity)
    private readonly mealUserRoleRepository: Repository<MealUserRoleEntity>,
  ) {}

  async findAll(filters?: MealFilterInterface): Promise<MealInterface[]> {
    try {
      const where = createFilters(filters);
      let meals = await this.mealsRepository.find({ where, order: { id: 'ASC' } });
      meals = await Promise.all(
        meals.map(async (meal) => {
          const submeals = await this.submealRepository.find({ where: { mealId: meal.id } });
          const mealUserRoles = await this.mealUserRoleRepository.find({ where: { mealId: meal.id } });
          meal.submeals = submeals;
          meal.mealUserRoles = mealUserRoles;
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

  async countAllByName(id: number): Promise<{ almoco: number; jantar: number }> {
    try {
      const almocoCount = await this.mealsRepository
        .createQueryBuilder('meal')
        .where('meal.id = :id', { id })
        .andWhere('meal.name LIKE :almoco', { almoco: '%almoço%' })
        .getCount();

      const jantarCount = await this.mealsRepository
        .createQueryBuilder('meal')
        .where('meal.id = :id', { id })
        .andWhere('meal.name LIKE :jantar', { jantar: '%jantar%' })
        .getCount();

      return {
        almoco: almocoCount,
        jantar: jantarCount,
      };
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

  async getMealsByDate(date: string) {
    try {
      const meals = await this.mealsRepository.find();
      const menuMeals = await this.menuMealsRepository.find();

      const mealsByDate = meals.filter((meal) => menuMeals.some((menuMeal) => menuMeal.mealId === meal.id));

      return mealsByDate;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as refeições.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
