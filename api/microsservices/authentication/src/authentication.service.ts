import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserInterface } from './interfaces/user.interface';
import { environment } from './environment/environment';
import { LoginDto } from './dtos/login.dto';
import { ViewMenuByUserRolesEntity } from './entities/view-menu-by-user-roles.entity';
import { ViewPrivilegesByUserRolesEntity } from './entities/view-privileges-by-user-roles.entity';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(ViewMenuByUserRolesEntity)
    private readonly viewMenusByRolesRepository: Repository<ViewMenuByUserRolesEntity>,

    @InjectRepository(ViewPrivilegesByUserRolesEntity)
    private readonly viewPrivilegesByRolesRepository: Repository<ViewPrivilegesByUserRolesEntity>,

    private readonly http: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string, user?: UserInterface | { id: number }): Promise<UserInterface> {
    const userFound = await this.getFindByEmail(email);
    if (userFound) {
    } else {
    }
    return userFound;
  }

  async getFindByEmail(email: string): Promise<UserInterface> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.api}/users/findUserByEmail`, email).subscribe({
        next: (user) => {
          resolve(user.data);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async getFindByRegister({ register: string }): Promise<UserInterface> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.api}/users/findUserByLogin`, { register: string }).subscribe({
        next: (user) => {
          resolve(user.data);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  async getFindByCPF(cpf: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.api}/users/findUserByCpf`, { cpf }).subscribe({
        next: (user) => {
          resolve(user.data);
        },
        error: (rej) => {
          reject(rej);
        },
      });
    });
  }

  removeMask(cpf: string) {
    return cpf.replace(/[^\d]+/g, '');
  }

  async login({ username, password }: LoginDto) {
    try {
      const user = await this.getFindByCPF(username);
      if (!user || !(await this.checkPassword(password, user.password))) {
        throw new UnauthorizedException('Essas credencias estão incorretas');
      }

      delete user.password;
      const { accessToken, payload } = await this.signToken(user);
      return { user: payload, accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({ message: `Não foi possivel realizar o login. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signToken(user: UserInterface): Promise<{ accessToken: string; payload: UserJwtInterface }> {
    const menus = await this.viewMenusByRolesRepository.find({
      where: { roleId: In(user.roles.map((role: any) => role.id)) },
    });

    const uniqueMenus = menus.filter(
      (menu, index, self) => index === self.findIndex((m) => m.menu === menu.menu && m.menuGroup === menu.menuGroup && m.route === menu.route && m.menuKey === menu.menuKey),
    );

    const privileges = await this.viewPrivilegesByRolesRepository.find({
      where: {
        roleId: In(user.roles.map((role: any) => role.id)),
      },
      select: ['key'],
    });
    const rolesId = user.roles.map((role) => role.id);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      register: user.register,
      cpf: user.cpf,
      rolesId: rolesId,
      menus: uniqueMenus,
      privileges,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { accessToken: this.jwtService.sign(payload), payload };
  }

  async checkPassword(plainPassword: string, password: string): Promise<boolean> {
    return (await bcrypt.compare(plainPassword, password)) as boolean;
  }
}
