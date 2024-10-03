import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  IsDefined,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  ValidateIf,
} from 'class-validator';
import { Match } from '../shared/decorators/match.decorator';

export class EditPersonalDataDto {
  @IsOptional()
  @IsInt({ message: 'O campo de ID precisa ser um inteiro.' })
  id?: number;

  @IsDefined({
    message: 'Nome do usuário: O campo do "name" deve ser válido.',
  })
  @IsString({
    message: 'Nome do usuário: O campo do "name" deve ser uma string.',
  })
  @IsNotEmpty({
    message: 'Nome do usuário: O campo do "name" não pode ser vázio.',
  })
  @MinLength(2, {
    message:
      'Nome do usuário: O campo do "name" deve possuir no mínimo 2 caracteres.',
  })
  @MaxLength(50, {
    message:
      'Nome do usuário: O campo do "name" deve possuir no máximo 50 caracteres.',
  })
  name: string;

  @IsNotEmpty({ message: 'E-mail: O campo do "email" não pode ser vázio.' })
  @IsDefined({ message: 'E-mail: O campo do "email" deve ser válido.' })
  @IsString({ message: 'E-mail: O campo do "email" deve ser uma string.' })
  @IsEmail({}, { message: 'E-mail: O campo "email" deve ser válido.' })
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  email: string;

  @IsOptional()
  @IsDefined({ message: 'O campo da Senha deve ser válido!' })
  @IsString({ message: 'O campo de Senha deve ser uma string!' })
  password?: string;

  @IsOptional()
  @IsDefined({ message: 'O campo da Nova Senha deve ser válido!' })
  @ValidateIf(
    (obj, value) =>
      obj.password !== undefined ||
      obj.password !== null ||
      obj.password !== '',
  )
  @IsNotEmpty({
    message:
      'O campo da Nova senha deve ser informado caso deseje alterar a senha',
  })
  @IsString({ message: 'O campo de Nova Senha deve ser uma string!' })
  newPassword?: string;

  @IsOptional()
  @IsDefined({ message: 'O campo da Confirmação da Senha deve ser válido!' })
  @ValidateIf(
    (obj, value) =>
      obj.newPassword !== undefined ||
      obj.newPassword !== null ||
      obj.newPassword !== '',
  )
  @IsNotEmpty({
    message:
      'O campo da Confirmação de senha deve ser informado caso deseje alterar a senha',
  })
  @IsString({ message: 'O campo de Confirmação da Senha deve ser uma string!' })
  @Match('newPassword', {
    message: 'As senhas não coincidem, por favor tente novamente.',
  })
  confirmPassword?: string;
}
