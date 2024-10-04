import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { UsersRolesCreateDto } from './create-users-roles.dto';

export class UsersRolesUpdateDto extends PartialType(UsersRolesCreateDto) {
  @IsNotEmpty({ message: 'O campo de ID é obrigátorio.' })
  @IsInt({ message: 'O campo de ID precisa ser um inteiro.' })
  id: number;

  @IsNotEmpty({ message: 'O campo de ID do Usuário é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do Usuário precisa ser um inteiro.' })
  userId: number;

  @IsNotEmpty({ message: 'O campo de ID do perfil de acesso é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do perfil de acesso precisa ser um inteiro.' })
  roleId: number;
}
