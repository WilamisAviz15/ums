import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { AuthenticationService } from '../authentication.service';
import { UserInterface } from '../interfaces/user.interface';

let service: AuthenticationService;

@ValidatorConstraint({ name: 'AuthenticationEmailOrCpf', async: true })
export class AuthenticationEmailOrCpf
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(AuthenticationService);
  }

  validEmail(email: string): boolean {
    // eslint-disable-next-line max-len
    const REG_EMAIL =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return REG_EMAIL.test(email?.toLowerCase());
  }

  async validate(
    login: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const body: UserInterface = Object.assign(validationArguments.object);

    let entity;

    if (this.validEmail(login)) {
      entity = await service.findByEmail(login, { id: body.id });
    } else {
      // entity = await service.findByCpf(login, { id: body.id });
    }

    return entity;
  }
}
