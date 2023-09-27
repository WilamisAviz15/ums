import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { MenusGroupNameAlreadyExistConstraint } from '../validate/menus-group-name-already-exist.constraint';

export class MenusGroupUpdateDto {
  @IsNotEmpty({ message: 'O campo de ID é obrigátorio.' })
  @IsInt({ message: 'O campo de ID precisa ser um inteiro.' })
  id: number;

  @Validate(MenusGroupNameAlreadyExistConstraint, {
    message: 'Já existe uma Grupo de Menu com este nome.',
  })
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
}
