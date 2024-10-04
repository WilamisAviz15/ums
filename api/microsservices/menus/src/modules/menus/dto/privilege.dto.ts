import { IsNotEmpty } from 'class-validator';

export class PrivilegeDto {
  @IsNotEmpty({ message: 'Informar ID do perfil.' })
  roleId: number;

  @IsNotEmpty({ message: 'Informar ID da ação.' })
  actionMenuId: number;
}
