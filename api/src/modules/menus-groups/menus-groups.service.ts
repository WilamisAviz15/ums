import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { Not, Repository } from 'typeorm';

import { MenusGroupInterface } from './interfaces/menus-group.interface';
import { MenusGroupEntity } from './entities/menus-group.entity';

import { MenusGroupFilterInterface } from './interfaces/menus-group-filter.interface';
import { MenusGroupCreateDto } from './dto/create-menus-group.dto';
import { MenusGroupUpdateDto } from './dto/update-menus-group.dto';

@Injectable()
export class MenusGroupsService {
  constructor(
    @InjectRepository(MenusGroupEntity)
    private readonly menusGroupsRepository: Repository<MenusGroupEntity>,
  ) {}

  async findAll(
    filter?: MenusGroupFilterInterface,
  ): Promise<MenusGroupInterface[]> {
    try {
      const where = createFilters(filter);
      return await this.menusGroupsRepository.find({
        where,
        order: { name: 'ASC', order: 'DESC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os grupos de menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<MenusGroupInterface> {
    try {
      return await this.menusGroupsRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o grupo de menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(
    name: string,
    menusGroup: MenusGroupInterface,
  ): Promise<MenusGroupInterface> {
    try {
      const id = menusGroup.id || 0;
      return await this.menusGroupsRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
        select: ['name'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o grupo de menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    body: MenusGroupCreateDto,
  ): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    try {
      const entity = Object.assign(new MenusGroupEntity(), body);
      const menusGroup = await this.menusGroupsRepository.save(entity);

      return {
        menusGroup,
        message: 'O grupo de menus foi criado com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o grupo de menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    body: MenusGroupUpdateDto,
    id: number,
  ): Promise<{ menusGroup: MenusGroupInterface; message: string }> {
    try {
      const entity = Object.assign(new MenusGroupEntity(), body);
      await this.menusGroupsRepository.save(entity);

      const menusGroup = await this.menusGroupsRepository.findOne({
        where: { id },
      });
      return {
        menusGroup,
        message: 'O grupo de menus foi atualizado com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o grupo de menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.menusGroupsRepository.softDelete(id);
      return { message: 'O grupo de menus foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o grupo de menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
