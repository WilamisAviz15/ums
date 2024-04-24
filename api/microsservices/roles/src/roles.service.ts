import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleEntity } from './entities/role.entity';
import { RoleInterface } from './interfaces/role.interface';
import { RoleCreateDto } from './dto/create-role.dto';
import { RoleUpdateDto } from './dto/update-role.dto';
import { RoleFilterInterface } from './interfaces/role-filter.interface';
import { createFilters } from './utils/typeorm/create-filters.utils';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  async create(
    data: RoleCreateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    try {
      const entity = Object.assign(new RoleEntity(), data);
      const role = await this.rolesRepository.save(entity);

      return { role, message: 'O perfil de acesso foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string, role: RoleInterface): Promise<RoleInterface> {
    try {
      const id = role.id || 0;
      return await this.rolesRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
        select: ['name'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o perfil de acesso.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    data: RoleUpdateDto,
    id: number,
  ): Promise<{ role: RoleInterface; message: string }> {
    try {
      const entity = Object.assign(new RoleEntity(), data);
      console.log(entity);
      await this.rolesRepository.update(id, entity);

      const role = await this.rolesRepository.findOne({ where: { id } });
      return {
        role,
        message: 'O perfil de acesso foi atualizado com sucesso.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível atualizar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filter?: RoleFilterInterface): Promise<RoleInterface[]> {
    try {
      const where = createFilters(filter);
      return await this.rolesRepository.find({
        where,
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os perfis de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.rolesRepository.delete(id);
      return { message: 'O perfil de acesso foi removido com sucesso' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
