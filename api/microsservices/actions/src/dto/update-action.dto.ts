import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ActionNameAlreadyExist } from '../validate/action-name-already-exist.constraint';

export class ActionUpdateDto {
  @IsNotEmpty({ message: 'O campo de ID da ação é obrigátorio.' })
  @IsInt({ message: 'O campo de ID da ação precisa ser um inteiro.' })
  id: number;

  @Validate(ActionNameAlreadyExist, {
    message: 'Já existe uma Ação com este nome.',
  })
  @IsString({ message: 'O campo de Nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de Nome é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de Nome precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'O campo de Nome pode ter no máximo 50 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
