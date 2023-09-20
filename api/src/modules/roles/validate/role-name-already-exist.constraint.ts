/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RolesService } from '../roles.service';
import { RoleInterface } from '../interfaces/role.interface';

let service: RolesService;

@ValidatorConstraint({ name: 'RoleNameAlreadyExist', async: true })
export class RoleNameAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit(): void {
    service = this.moduleRef.get(RolesService);
  }
  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const role: RoleInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, role);
    return !entity;
  }
}
