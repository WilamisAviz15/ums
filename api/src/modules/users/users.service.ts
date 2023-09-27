import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';
import * as bcryptjs from 'bcrypt';

import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { UserEntity } from './entities/user.entity';
import { UserFilterInterface } from './interfaces/user-filter.interface';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { UserJwtInterface } from '../../authentication/interfaces/user-jwt.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(filters: UserFilterInterface) {
    try {
      const where = createFilters(filters);
      return await this.userRepository.find({ where, order: { id: 'ASC' } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível encontrar os usuários.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: UserCreateDto,
    currentAdmin: UserInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity = Object.assign(new UserEntity(), data);
      const user = await this.userRepository.save(entity);
      return { user, message: 'O usuário foi criada com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: `Não foi possível criar o usuário.` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    data: UserUpdateDto,
    currentUser: UserJwtInterface,
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
        { message: 'Não foi possível atualizar o usuário.' },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  }

  removeMask(cpf: string) {
    return cpf.replace(/[^\d]+/g, '');
  }

  async findOne(id: number): Promise<UserInterface> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['roles'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o usuário.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const admin = await this.userRepository.findOneOrFail({ where: { id } });

      const name = await bcryptjs.hash(admin.name, 10);
      const email = await bcryptjs.hash(admin.email, 10);

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
      const id = body.id || 0;
      return await this.userRepository.findOne({
        select: ['email'],
        where: {
          email,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o usuário.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByCpf(cpf: string, body: UserInterface): Promise<UserInterface> {
    try {
      const id = body.id || 0;
      return await this.userRepository.findOne({
        select: ['cpf'],
        where: {
          cpf,
          id: Not(id),
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
}
