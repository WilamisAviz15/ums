import { IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Match } from '../shared/decorators/match.decorator';

export class ResetPasswordDto {
  @IsDefined({ message: 'O campo da Senha deve ser válido!' })
  @IsString({ message: 'O campo de Senha deve ser uma string!' })
  @IsNotEmpty({ message: 'O campo de Senha não pode ser vazio!' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, um caractere especial, um número e uma letra minúscula.',
  })
  password: string;

  @IsDefined({ message: 'O campo da Confirmação da Senha deve ser válido!' })
  @IsString({ message: 'O campo de Confirmação da Senha deve ser uma string!' })
  @IsNotEmpty({
    message: 'O campo de Confirmação da Senha não pode ser vazio!',
  })
  @Match('password', {
    message: 'As senhas não coincidem, por favor tente novamente.',
  })
  confirmPassword: string;
}
