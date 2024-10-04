/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { MenusService } from '../menus.service';
import { MenuInterface } from '../interfaces/menu.interface';

let service: MenusService;

@ValidatorConstraint({ name: 'MenuNameAlreadyExist', async: true })
export class MenuNameAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(MenusService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const body: MenuInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, body);
    return !entity;
  }
}
