import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { In, Not, Repository } from 'typeorm';

import { ActionInterface } from './interfaces/action.interface';
import { ActionEntity } from './entities/action.entity';
import { ActionsMenuEntity } from './entities/actions-menu.entity';
import { ActionCreateDto } from './dto/create-action.dto';
import { ActionUpdateDto } from './dto/update-action.dto';
import { MenuEntity } from '../menus/entities/menu.entity';
import { PrivilegeEntity } from '../menus/entities/privilege.entity';
import { ActionFilterInterface } from './interfaces/action-filter.interface';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionsRepository: Repository<ActionEntity>,
    @InjectRepository(ActionsMenuEntity)
    private readonly actionsMenuRepository: Repository<ActionsMenuEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(PrivilegeEntity)
    private readonly privilegeRepository: Repository<PrivilegeEntity>,
  ) {}

  async findAll(filters?: ActionFilterInterface): Promise<ActionInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.actionsRepository.find({ where, order: { id: 'ASC' } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as ações.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ActionInterface> {
    try {
      return await this.actionsRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(
    name: string,
    action: ActionInterface,
  ): Promise<ActionInterface> {
    try {
      const id = action.id || 0;
      return await this.actionsRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
        select: ['name'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    try {
      const entity = Object.assign(new ActionEntity(), data);
      const action = await this.actionsRepository.save(entity);
      const menus = await this.menuRepository.find();
      const actionsMenuCreate = menus.map((menu) => ({
        actionId: action.id,
        menuId: menu.id,
      }));
      await this.actionsMenuRepository.save(actionsMenuCreate);

      return { action, message: 'A ação foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    data: ActionUpdateDto,
    id: number,
  ): Promise<{ action: ActionInterface; message: string }> {
    try {
      const entity = Object.assign(new ActionEntity(), data);
      await this.actionsRepository.save(entity);

      const action = await this.actionsRepository.findOne({ where: { id } });
      return { action, message: 'A ação foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const actionsMenu = await this.actionsMenuRepository.find({
        where: { actionId: id },
      });
      await this.privilegeRepository.delete({
        actionMenuId: In(actionsMenu.map((item) => item.id)),
      });
      await this.actionsMenuRepository.delete({ actionId: id });
      await this.actionsRepository.delete(id);

      return { message: 'A ação foi removida com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
