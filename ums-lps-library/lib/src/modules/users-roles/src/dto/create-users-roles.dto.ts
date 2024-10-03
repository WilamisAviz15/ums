import { IsNotEmpty, IsInt } from 'class-validator';

export class UsersRolesCreateDto {
  @IsNotEmpty({ message: 'O campo de ID do Usuário é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do Usuário precisa ser um inteiro.' })
  userId: number;

  @IsNotEmpty({ message: 'O campo de ID do perfil de acesso é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do perfil de acesso precisa ser um inteiro.' })
  roleId: number;
}
