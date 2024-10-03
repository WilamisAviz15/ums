/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '../users.service';
import { UserInterface } from '../interfaces/user.interface';

let service: UsersService;

@ValidatorConstraint({ name: 'UsersCpfAlreadyExist', async: true })
export class UserCpfAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(UsersService);
  }

  async validate(
    cpf: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: UserInterface = Object.assign(validationArguments.object);
    const entity = await service.findByCpf(cpf, user);
    return !entity;
  }
}
