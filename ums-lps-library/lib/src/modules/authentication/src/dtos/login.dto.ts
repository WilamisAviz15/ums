import { IsDefined, IsNotEmpty, IsString, Validate } from 'class-validator';

// import { AuthenticationEmailOrCpf } from '../validate/authentication-email-or-cpf.constraint';

export class LoginDto {
  username: string;

  @IsDefined({ message: 'Senha: O campo "password" deve ser válido!' })
  @IsString({ message: 'Senha: O campo "password" deve ser uma string!' })
  @IsNotEmpty({ message: 'Senha: O campo "password" não pode ser vazio!' })
  password: string;
}
