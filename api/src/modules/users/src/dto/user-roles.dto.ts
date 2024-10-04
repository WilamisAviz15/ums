import { IsInt, IsNotEmpty } from 'class-validator';

export class UserRolesDto {
  @IsNotEmpty({ message: 'O campo de ID do Perfil de Acesso é obrigátorio.' })
  @IsInt({
    message: 'O campo de ID do Perfil de Acesso precisa ser um inteiro.',
  })
  id: number;
}
