import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

import { UserRoleEntity } from './entities/user-role.entity';
import { UserRoleInterface } from './interfaces/user-role.interface';
import { environment } from './environment/environment';
import { UserInterface } from './interfaces/user.interface';
import { RoleInterface } from './interfaces/role.interface';

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
}
