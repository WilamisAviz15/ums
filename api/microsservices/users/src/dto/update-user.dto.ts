import { Transform, TransformFnParams, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength, MinLength, Validate, ValidateNested } from 'class-validator';

import { UserCpfAlreadyExist } from '../validate/users-cpf-already-exist.constraint';
import { RoleUserAlreadyExist } from '../validate/role-already-exist.constraint';
import { UserRolesDto } from './user-roles.dto';

export class UserUpdateDto {
  @IsNotEmpty({ message: 'O campo de ID do Usuário é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do Usuário precisa ser um inteiro.' })
  id: number;

  @IsString({ message: 'O campo de nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de nome é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de nome precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'O campo de nome pode ter no máximo 50 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsNotEmpty({ message: 'O campo e-mail é obrigátorio.' })
  @IsString({ message: 'O campo de e-mail precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de e-mail é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de e-mail precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(100, {
    message: 'O campo de e-mail pode ter no máximo 100 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @IsDefined({ message: 'O campo CPF deve ser válido!' })
  @IsString({ message: 'O campo CPF deve ser uma string!' })
  @MinLength(11, {
    message: 'O campo CPF precisa ter pelo menos 11 caracteres.',
  })
  @MaxLength(11, {
    message: 'O campo CPF precisa ter pelo menos 11 caracteres.',
  })
  @Validate(UserCpfAlreadyExist, {
    message: 'O CPF já está sendo utilizado por outro usuário.',
  })
  cpf: string;

  @IsArray()
  @ArrayMinSize(0, { message: 'Informe ao menos um perfil de acesso' })
  @ValidateNested({ each: true })
  @Type(() => UserRolesDto)
  @Validate(RoleUserAlreadyExist, {
    message: 'Não é possível associar o mesmo PERFIL a um usuário, por favor verifique os perfis selecionados.',
  })
  roles: UserRolesDto[];

  userRoles: { userId: number | undefined; roleId: number }[];
}
