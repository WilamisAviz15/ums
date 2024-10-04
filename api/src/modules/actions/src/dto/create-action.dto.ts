import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';
// import { ActionNameAlreadyExist } from '../validate/action-name-already-exist.constraint';

export class ActionCreateDto {
  // @Validate(ActionNameAlreadyExist, {
  //   message: 'Já existe uma Ação com este nome.',
  // })
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
