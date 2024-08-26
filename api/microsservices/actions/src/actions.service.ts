import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Not, Repository } from 'typeorm';

import { ActionEntity } from './entities/action.entity';
import { ActionFilterInterface } from './interfaces/action-filter.interface';
import { ActionInterface } from './interfaces/action.interface';
import { createFilters } from './utils/typeorm/create-filters.utils';
import { ActionCreateDto } from './dto/create-action.dto';
import { ActionsMenuEntity } from './entities/actions-menu.entity';
import { environment } from './environment/environment';
import { ActionUpdateDto } from './dto/update-action.dto';
import { ActionsMenuInterface } from './interfaces/actions-menu.interface';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionsRepository: Repository<ActionEntity>,
    @InjectRepository(ActionsMenuEntity)
    private readonly actionsMenuRepository: Repository<ActionsMenuEntity>,
    private readonly http: HttpService,
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

  async findById(filters?: ActionFilterInterface): Promise<ActionInterface> {
    try {
      const where = createFilters(filters);
      return await this.actionsRepository.findOne({
        where,
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
      const menus = await this.getMenus();
      const actionsMenuCreate = menus.map((menu) => ({
        actionId: action.id,
        menuId: menu.id,
      }));
      await this.actionsMenuRepository.save(actionsMenuCreate);

      return { action, message: 'A ação foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível criar a ação. ${error}` },
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
      await this.removePrivileges(actionsMenu);
      await this.actionsMenuRepository.delete({ actionId: id });
      await this.actionsRepository.delete(id);

      return { message: 'A ação foi removida com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível excluir a ação. ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMenus(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/menus/`).subscribe({
        next: (menus) => {
          resolve(menus.data);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async removePrivileges(actionsMenu: ActionsMenuInterface[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .patch(`${environment.api}/menus/remove-privileges`, actionsMenu)
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
