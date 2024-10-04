/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { MealsService } from '../meals.service';
import { MealInterface } from '../interfaces/meal.interface';

let service: MealsService;

@ValidatorConstraint({ name: 'MealsNameAlreadyExist', async: true })
export class MealNameAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(MealsService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const meal: MealInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, meal);
    return !entity;
  }
}
