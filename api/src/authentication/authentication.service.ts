import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { UserJwtInterface } from './interfaces/user-jwt.interface';
import { RoleInterface } from '../modules/roles/interfaces/role.interface';
import { UserEntity } from '../modules/users/entities/user.entity';
import { UsersService } from '../modules/users/users.service';
import { UserInterface } from '../modules/users/interfaces/user.interface';
import { ViewMenuByUserRolesEntity } from './entities/view-menu-by-user-roles.entity';
import { ViewPrivilegesByUserRolesEntity } from './entities/view-privileges-by-user-roles.entity';
import { ViewPrivilegeByRoleInterface } from 'src/modules/menus/interfaces/view-privilege-by-role.interface';
import { LoginDto } from './dtos/login.dto';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ViewMenuByUserRolesEntity)
    private readonly viewMenusByRolesRepository: Repository<ViewMenuByUserRolesEntity>,

    @InjectRepository(ViewPrivilegesByUserRolesEntity)
    private readonly viewPrivilegesByRolesRepository: Repository<ViewPrivilegesByUserRolesEntity>,

    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login({ username, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: [{ cpf: this.removeMask(username) }],
        relations: ['roles'],
        select: ['id', 'name', 'email', 'cpf', 'password'],
      });
      if (!user || !(await user.checkPassword(password))) {
        throw new UnauthorizedException('Essas credencias estão incorretas');
      }

      delete user.password;
      const { accessToken, payload } = await this.signToken(user);
      return { user: payload, accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: `Não foi possivel realizar o login. ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async recoverPassword(
    data: RecoverPasswordDto,
  ): Promise<{ message: string }> {
    try {
      const user = await this.userService.findByCpf(data.login);
      if (!user) {
        throw new UnauthorizedException({
          message:
            'Nenhum usuário encontrado com o E-mail ou CPF fornecido. Verifique o campo selecionado e forneça um E-mail ou CPF registrado no sistema.',
        });
      }

      const token = crypto
        .createHash('md5')
        .update(`${user.email}${user.cpf}${Date.now}`)
        .digest('hex');

      return {
        message:
          'A solicitação de recuperação da senha foi enviada com sucesso.',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Não foi possível enviar a redifinição da senha' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(
    email: string,
    user: UserInterface | { id: number },
  ): Promise<UserInterface> {
    try {
      const id: number = user?.id || 0;
      return await this.userRepository.findOne({
        where: {
          email,
          id: Not(id),
        },
        relations: ['roles'],
        select: ['id', 'name', 'email', 'createdAt'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o administrador.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByCpf(
    cpf: string,
    user: UserInterface | { id: number },
  ): Promise<UserInterface> {
    try {
      const id = user.id || 0;
      return await this.userRepository.findOne({
        select: ['cpf'],
        where: {
          cpf: this.removeMask(cpf),
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

  removeMask(cpf: string) {
    console.log(cpf);
    return cpf.replace(/[^\d]+/g, '');
  }

  async signToken(
    user: UserInterface,
  ): Promise<{ accessToken: string; payload: UserJwtInterface }> {
    console.log(user.roles);
    const menus = await this.viewMenusByRolesRepository.find({
      where: { roleId: In(user.roles.map((role: RoleInterface) => role.id)) },
    });

    const privileges = await this.viewPrivilegesByRolesRepository.find({
      where: {
        roleId: In(user.roles.map((role: RoleInterface) => role.id)),
      },
      select: ['key'],
    });

    const rolesId = user.roles.map((role) => role.id);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      rolesId: rolesId,
      menus,
      register: user.register,
      privileges,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { accessToken: this.jwtService.sign(payload), payload };
  }

  async getUserPrivileges(
    rolesId: Array<number>,
  ): Promise<ViewPrivilegeByRoleInterface[]> {
    try {
      return await this.viewPrivilegesByRolesRepository.find({
        where: {
          roleId: In(rolesId),
        },
        select: ['key'],
      });
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível obter os privilégios.` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(
    token: string,
    body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    try {
      return;
      // return await this.userService.resetPassword(token, body);
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(token: string): Promise<{
    user: Partial<UserInterface>;
    accessToken: string;
    id: number;
  }> {
    try {
      if (!token) {
        throw new UnauthorizedException({ message: 'Token inválido.' });
      }

      const currentUser = this.jwtService.decode(token) as UserJwtInterface;
      const user = await this.userRepository.findOneOrFail({
        where: { email: currentUser.email },
        relations: ['roles'],
      });

      const data = await this.signToken({ ...user });

      return { user, accessToken: data.accessToken, id: user.id };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new HttpException(
        { message: 'Erro ao atualizar token.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
