import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type User = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  register: string;
  roles: number[];
  lastAccess?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export const AuthUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
