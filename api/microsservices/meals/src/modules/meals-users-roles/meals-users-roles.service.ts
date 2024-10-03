import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MealUserRoleEntity } from './entities/meals-users-roles.entity';
import { MealUserRoleInterface } from './interfaces/meal-user-role.interface';
import { MealUserRoleCreateDto } from './dto/create-meal-user-role.dto';
import { MealUserRoleUpdateDto } from './dto/update-meal-user-role.dto';

@Injectable()
export class MealUserRoleService {
  constructor(
    @InjectRepository(MealUserRoleEntity)
    private readonly MealsUserRolesRepository: Repository<MealUserRoleEntity>,
  ) {}

  async findAll(): Promise<MealUserRoleInterface[]> {
    try {
      return await this.MealsUserRolesRepository.find({ order: { id: 'ASC' } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as refeições por perfil de usuario.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<MealUserRoleInterface[]> {
    try {
      return await this.MealsUserRolesRepository.find({ where: { mealId: id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar refeições por perfil de usuario.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: MealUserRoleCreateDto[]): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    try {
      const entities = data.map((dto) => Object.assign(new MealUserRoleEntity(), dto));
      const mealUserRoles = await this.MealsUserRolesRepository.save(entities);

      return { mealUserRoles, message: 'A refeição por perfil de usuario foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível criar a refeição por perfil de usuario. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(mealId, data: MealUserRoleUpdateDto[]): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    try {
      await this.MealsUserRolesRepository.delete({ mealId });
      const entities = data.map((dto) => {
        const entity = Object.assign(new MealUserRoleEntity(), dto);
        entity.mealId = mealId;
        return entity;
      });
      const mealUserRoles = await this.MealsUserRolesRepository.save(entities);

      return { mealUserRoles, message: 'A refeição por perfil de usuario foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar a refeição por perfil de usuario.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.MealsUserRolesRepository.delete(id);

      return { message: 'A refeição por perfil de usuario foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir a refeição por perfil de usuario.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
