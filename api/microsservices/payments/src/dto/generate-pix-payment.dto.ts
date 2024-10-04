import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GeneratePixPaymentDto {
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

  @IsString({ message: 'O campo de cpf precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de cpf é obrigátorio.' })
  @MinLength(11, {
    message: 'O campo de cpf precisa ter pelo menos 11 caracteres.',
  })
  @MaxLength(11, {
    message: 'O campo de cpf pode ter no máximo 11 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  cpf: string;

  @IsString({ message: 'O campo de valor precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de valor é obrigátorio.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  price: string;
}
