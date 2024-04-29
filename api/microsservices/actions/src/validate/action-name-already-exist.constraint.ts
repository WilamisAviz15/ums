/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ActionsService } from '../actions.service';
import { ActionInterface } from '../interfaces/action.interface';

let service: ActionsService;

@ValidatorConstraint({ name: 'ActionNameAlreadyExist', async: true })
export class ActionNameAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(ActionsService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const action: ActionInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, action);
    return !entity;
  }
}
