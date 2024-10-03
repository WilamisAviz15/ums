import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { Transform, TransformFnParams } from 'class-transformer';
import { MenuNameAlreadyExist } from '../validate/menus-name-already-exist.contraint';
import { ActionsMenuInterface } from '../interfaces/actions-menu.interface';

export class MenuCreateDto {
  @Validate(MenuNameAlreadyExist, {
    message: 'Já existe um Menu com este nome.',
  })
  @IsString({ message: 'O campo de Nome do Menu precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de Nome do Menu é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de Nome do Menu precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(150, {
    message: 'O campo de Nome do Menu pode ter no máximo 150 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsString({ message: 'O campo de Rota precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de Rota é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de Rota precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(150, {
    message: 'O campo de Rota pode ter no máximo 150 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  route: string;

  @IsString({ message: 'O campo de Icone precisa ser uma string.' })
  @IsOptional({ message: 'O campo de Icone é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de Icone precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(150, {
    message: 'O campo de Icone pode ter no máximo 150 caracteres.',
  })
  icon: string;

  @IsNotEmpty({ message: 'O campo de ID do Grupo de Menus é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do Grupo de Menus precisa ser um inteiro.' })
  menuGroupId: number;

  @IsString({ message: 'O campo de Chave do Menu precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de Chave do Menu é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de Chave do Menu precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(150, {
    message: 'O campo de Chave do Menu pode ter no máximo 150 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  menuKey: string;

  @IsOptional()
  actionMenus?: ActionsMenuInterface[];
}
