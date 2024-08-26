import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcrypt';

import { UserCreateDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { UserFilterInterface } from './interfaces/user-filter.interface';
import { createFilters } from './utils/typeorm/create-filters.utils';
import { UserUpdateDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { environment } from './environment/environment';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly http: HttpService,
  ) {}

  async create(
    data: UserCreateDto,
    currentUser: UserInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity = Object.assign(new UserEntity(), data);
      const user = await this.userRepository.save(entity);
      return { user, message: 'O usuário foi criado com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: `Não foi possível criar o usuário. ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filters: UserFilterInterface) {
    try {
      const where = createFilters(filters);
      return await this.userRepository.find({
        where,
        order: { id: 'ASC' },
        // relations: ['roles'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os usuários.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findUserByCPF(cpf: string) {
    try {
      return await this.userRepository.findOne({
        where: { cpf },
        order: { id: 'ASC' },
        // relations: ['roles'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os usuários.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getRoleById(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/roles`).subscribe({
        next: (roles) => {
          const role = roles.data.filter((role) => role.id === id);
          resolve(role);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async findByRegister(register: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        select: [
          'id',
          'name',
          'email',
          'cpf',
          'password',
          'createdAt',
          'roleId',
        ],
        where: { register },
      });
      await this.getRoleById(user.roleId).then(
        (role) => (user.roles = [...role]),
      );
      return user;
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível encontrar o usuário. ${error}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<UserInterface> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        // relations: ['roles'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o usuário.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  removeMask(cpf: string) {
    return cpf.replace(/[^\d]+/g, '');
  }

  async update(
    data: UserUpdateDto,
    currentUser: UserInterface,
    id: number,
  ): Promise<{ user: UserInterface; message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      const entity = Object.assign(new UserEntity(), { ...data, id });

      for (const entityRole of entity.roles) {
        if (!entityRole.id) {
          delete entityRole.id;
        }
      }

      await queryRunner.connect();

      await this.userRepository.save(entity);
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      await queryRunner.commitTransaction();

      await queryRunner.release();

      return { user, message: ' Usuário atualizado com sucesso.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        { message: `Não foi possível atualizar o usuário. ${error}` },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });

      const name = await bcryptjs.hash(user.name, 10);
      const email = await bcryptjs.hash(user.email, 10);

      await this.userRepository.update(id, { name, email });
      await this.userRepository.softDelete(id);

      return { message: 'O usuário foi removido com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Falha ao remover usuário.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(
    email: string,
    body?: UserInterface,
  ): Promise<UserInterface> {
    try {
      // const id = body.id || 0;
      return await this.userRepository.findOne({
        select: ['id', 'name', 'email', 'createdAt'],
        where: {
          email,
          // id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível encontrar o usuário. ${error}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByCpf(cpf: string, body?: UserInterface): Promise<UserInterface> {
    try {
      return await this.userRepository.findOne({
        select: ['cpf'],
        where: {
          cpf,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o usuário pelo CPF fornecido.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findLoginByCpf(cpf: string): Promise<UserInterface> {
    try {
      const user = await this.userRepository.findOne({
        select: [
          'id',
          'name',
          'email',
          'cpf',
          'password',
          'createdAt',
          'roleId',
        ],
        where: { cpf },
      });
      await this.getRoleById(user.roleId).then(
        (role) => (user.roles = [...role]),
      );
      return user;
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível encontrar o usuário. ${error}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
