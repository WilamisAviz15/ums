import { IsCPF } from 'brazilian-class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEmail, Validate, IsDefined, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { UserEmailAlreadyExist } from '../validate/users-email-already-exist.constraint';
import { UserCpfAlreadyExist } from '../validate/users-cpf-already-exist.constraint';
import { UserRolesDto } from './user-roles.dto';
import { RoleUserAlreadyExist } from '../validate/role-already-exist.constraint';

export class UserCreateDto {
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

  @IsString({ message: 'O campo de e-mail precisa ser uma string.' })
  @IsOptional({ message: 'O campo de e-mail é obrigátorio.' })
  @MaxLength(255, {
    message: 'O campo de e-mail pode ter no máximo 255 caracteres.',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  @Validate(UserEmailAlreadyExist, {
    message: 'O e-mail já está sendo utilizado por outro usuário.',
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
  @IsCPF({ message: 'O campo CPF precisa ser válido.' })
  @Validate(UserCpfAlreadyExist, {
    message: 'O CPF já está sendo utilizado por outro usuário.',
  })
  cpf: string;

  @IsDefined({ message: 'O campo senha deve ser válido!' })
  @MinLength(3, {
    message: 'O campo senha precisa ter pelo menos 3 caracteres.',
  })
  password: string;

  @IsDefined({ message: 'O campo matrícula deve ser válido!' })
  @MinLength(8, {
    message: 'O campo matrícula precisa ter pelo menos 8 caracteres.',
  })
  register: string;

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
