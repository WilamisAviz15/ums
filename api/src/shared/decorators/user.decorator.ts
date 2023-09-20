import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../modules/users/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
