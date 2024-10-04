import { IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @IsNotEmpty({ message: 'O campo de E-mail OU CPF não pode ser vazio!' })
  login: string;
}
