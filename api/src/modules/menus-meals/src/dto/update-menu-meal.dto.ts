import { PartialType } from '@nestjs/mapped-types';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

import { MenuMealCreateDto } from './create-menu-meal.dto';

export class MenuMealUpdateDto extends PartialType(MenuMealCreateDto) {
  @IsNotEmpty({ message: 'O campo id  é obrigátorio.' })
  id: number;
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

  @IsString({ message: 'O campo de descricao precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de descricao é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de descricao precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'O campo de descricao pode ter no máximo 50 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsNotEmpty({ message: 'O campo de data é obrigátorio.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  date: string;

  @IsNotEmpty({ message: 'O campo id da refeição é obrigátorio.' })
  mealId: number;
}
