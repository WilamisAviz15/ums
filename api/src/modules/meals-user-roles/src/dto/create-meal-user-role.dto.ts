import { IsInt, IsNotEmpty } from 'class-validator';

export class MealUserRoleCreateDto {
  @IsNotEmpty({ message: 'O campo de ID da subrefeição é obrigátorio.' })
  @IsInt({ message: 'O campo de ID da subrefeição precisa ser um inteiro.' })
  submealId: number;

  @IsNotEmpty({ message: 'O campo de ID do perfil é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do perfil precisa ser um inteiro.' })
  roleId: number;
}
