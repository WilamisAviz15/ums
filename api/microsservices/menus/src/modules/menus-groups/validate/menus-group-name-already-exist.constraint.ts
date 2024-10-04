/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { MenusGroupsService } from '../menus-groups.service';
import { MenusGroupInterface } from '../interfaces/menus-group.interface';

let service: MenusGroupsService;

@ValidatorConstraint({
  name: 'MenusGroupNameAlreadyExistConstraint',
  async: true,
})
export class MenusGroupNameAlreadyExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit(): void {
    service = this.moduleRef.get(MenusGroupsService);
  }
  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const menuGroup: MenusGroupInterface = Object.assign(
      validationArguments.object,
    );
    const entity = await service.findByName(name, menuGroup);
    return !entity;
  }
}
