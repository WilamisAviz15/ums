import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { RoleNameAlreadyExist } from '../validate/role-name-already-exist.constraint';

export class RoleUpdateDto {
  @IsNotEmpty({
    message:
      'Perfil de Acesso: O campo de ID do Perfil de Acesso é obrigátorio.',
  })
  @IsInt({
    message:
      'Perfil de Acesso: O campo de ID do Perfil de Acesso precisa ser um inteiro.',
  })
  id: number;

  @Validate(RoleNameAlreadyExist, {
    message: 'Perfil de Acesso: Já existe uma Perfil de Acesso com este nome.',
  })
  @IsString({
    message: 'Perfil de Acesso: O campo de nome precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'Perfil de Acesso: O campo de nome é obrigátorio.' })
  @MinLength(3, {
    message:
      'Perfil de Acesso: O campo de nome precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message:
      'Perfil de Acesso: O campo de nome pode ter no máximo 50 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
