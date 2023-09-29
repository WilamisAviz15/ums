import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MenuMealEntity } from './entities/menu-meal.entity';
import { MenuMealCreateDto } from './dto/create-menu-meal.dto';
import { MenuMealFilterInterface } from './interfaces/menu-meal-filter.interface';
import { MenuMealInterface } from './interfaces/menu-meal.interface';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { MenuMealUpdateDto } from './dto/update-menu-meal.dto';

@Injectable()
export class MenuMealService {
  constructor(
    @InjectRepository(MenuMealEntity)
    private readonly menuMealsRepository: Repository<MenuMealEntity>,
  ) {}

  async findAll(
    filters?: MenuMealFilterInterface,
  ): Promise<MenuMealInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.menuMealsRepository.find({
        where,
        order: { id: 'ASC' },
        relations: ['user', 'meal'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os cardápios.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<MenuMealInterface> {
    try {
      return await this.menuMealsRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o cardápio.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: MenuMealCreateDto,
  ): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    try {
      const entity = Object.assign(new MenuMealEntity(), data);
      const menuMeal = await this.menuMealsRepository.save(entity);

      return { menuMeal, message: 'O cardápio foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível criar o cardápio. ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    data: MenuMealUpdateDto,
    id: number,
  ): Promise<{ menuMeal: MenuMealInterface; message: string }> {
    try {
      const entity = Object.assign(new MenuMealEntity(), data);
      await this.menuMealsRepository.save(entity);

      const menuMeal = await this.menuMealsRepository.findOne({
        where: { id },
      });
      return { menuMeal, message: 'O cardápio foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o cardápio.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.menuMealsRepository.delete(id);

      return { message: 'o cardápio foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o cardápio.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
