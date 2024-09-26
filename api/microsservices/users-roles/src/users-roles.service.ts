import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

import { UserRoleEntity } from './entities/user-role.entity';
import { UserRoleInterface } from './interfaces/user-role.interface';
import { environment } from './environment/environment';
import { UserInterface } from './interfaces/user.interface';
import { RoleInterface } from './interfaces/role.interface';
import { UsersRolesCreateDto } from './dto/create-users-roles.dto';
import { UsersRolesUpdateDto } from './dto/update-users-roles.dto';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly usersRolesRepository: Repository<UserRoleEntity>,
    private readonly http: HttpService,
  ) {}

  async findOneByUserId(userId: number): Promise<UserRoleInterface[]> {
    try {
      const usersRoles = await this.usersRolesRepository.find({
        where: { userId },
        order: { id: 'ASC' },
      });

      const filledUsersRoles = await Promise.all(
        usersRoles.map(async (userRole) => {
          const user = await this.findEntityByField<UserInterface>(userRole.userId, 'users', 'data', 'id');
          const roles = await this.findEntityByField<RoleInterface[]>(userRole.roleId, 'roles', 'data', 'id');
          userRole.user = user;
          userRole.roles = roles;

          return userRole;
        }),
      );

      return filledUsersRoles;
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os papeis do usuário.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findEntityByField<T>(fieldValue: number | string, route: string, dataKey: string, entityKey: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/${route}`).subscribe({
        next: (response) => {
          const entities = response[dataKey];
          const entity = entities.find((item) => item[entityKey] === fieldValue);
          resolve(entity);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async create(data: UsersRolesCreateDto[]): Promise<{ userRoles: UserRoleInterface[]; message: string }> {
    try {
      const entities = data.map((dto) => Object.assign(new UserRoleEntity(), dto));
      const userRoles = await this.usersRolesRepository.save(entities);

      return { userRoles, message: 'Os perfis de usuários foram criados com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({ message: `Não foi possível criar os perfis de usuário. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data: UsersRolesUpdateDto[], userId: number): Promise<{ userRoles: UserRoleInterface[]; message: string }> {
    try {
      await this.usersRolesRepository.delete({ userId });

      const entities = data.map((dto) => {
        const entity = Object.assign(new UserRoleEntity(), dto);
        entity.userId = userId;
        return entity;
      });

      const userRoles = await this.usersRolesRepository.save(entities);

      return {
        userRoles,
        message: 'Os perfis de usuários foram atualizados com sucesso.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'Não foi possível atualizar os perfis de acesso.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.usersRolesRepository.delete(id);
      return { message: 'O perfil do usuário foi removido com sucesso' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o perfil de acesso.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
