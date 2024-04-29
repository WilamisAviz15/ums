import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { ActionEntity } from './entities/action.entity';
import { ActionFilterInterface } from './interfaces/action-filter.interface';
import { ActionInterface } from './interfaces/action.interface';
import { createFilters } from './utils/typeorm/create-filters.utils';
import { ActionCreateDto } from './dto/create-action.dto';
import { ActionsMenuEntity } from './entities/actions-menu.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionsRepository: Repository<ActionEntity>,
    // @InjectRepository(ActionsMenuEntity)
    // private readonly actionsMenuRepository: Repository<ActionsMenuEntity>,
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

  async create(
    data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    try {
      const entity = Object.assign(new ActionEntity(), data);
      const action = await this.actionsRepository.save(entity);
      // const menus = await this.menuRepository.find();
      // const actionsMenuCreate = menus.map((menu) => ({
      //   actionId: action.id,
      //   menuId: menu.id,
      // }));
      // await this.actionsMenuRepository.save(actionsMenuCreate);

      return { action, message: 'A ação foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a ação.' },
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
}
