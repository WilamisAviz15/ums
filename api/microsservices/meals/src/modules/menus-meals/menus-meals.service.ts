import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealFilterInterface } from './interfaces/menu-meal-filter.interface';
import { MenuMealInterface } from './interfaces/menu-meal.interface';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';
import { createFilters } from '../../utils/typeorm/create-filters.utils';
import { MenuMealEntity } from './entities/menu-meal.entity';

@Injectable()
export class MenuMealService {
  constructor(
    @InjectRepository(MenuMealEntity)
    private readonly menuMealsRepository: Repository<MenuMealEntity>,
  ) {}

  async findAll(filters?: MenuMealFilterInterface): Promise<MenuMealInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.menuMealsRepository.find({
        where,
        order: { id: 'ASC' },
        relations: ['meal'],
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os cardápios.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<MenuMealInterface> {
    try {
      return await this.menuMealsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o cardápio.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByMealIdAndDate(mealId: number, date: string): Promise<MenuMealInterface> {
    try {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return await this.menuMealsRepository
        .createQueryBuilder('menu_meals')
        .where('menu_meals.mealId = :mealId', { mealId })
        .andWhere('DATE(menu_meals.date) = :date', { date: newDate.toISOString().split('T')[0] })
        .getOne();
    } catch (error) {
      throw new HttpException({ message: `Não foi possível encontrar o cardápio. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByDate(date: string): Promise<MenuMealInterface[]> {
    try {
      return await this.menuMealsRepository
        .createQueryBuilder('menu_meals')
        .where('DATE(menu_meals.date) = :date', { date: new Date(date).toISOString().split('T')[0] })
        .getMany();
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o cardápio.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: MenuMealCreateDto): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    try {
      const entity = Object.assign(new MenuMealEntity(), data);
      const menuMeal = await this.menuMealsRepository.save(entity);

      return { menuMeal, message: 'O cardápio foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível criar o cardápio. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data: MenuMealUpdateDto): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    try {
      const entity = Object.assign(new MenuMealEntity(), data);
      await this.menuMealsRepository.save(entity);

      const menuMeal = await this.menuMealsRepository.findOne({
        where: { id: data.id },
      });
      return { menuMeal, message: 'O cardápio foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar o cardápio.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.menuMealsRepository.delete(id);

      return { message: 'o cardápio foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o cardápio.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
