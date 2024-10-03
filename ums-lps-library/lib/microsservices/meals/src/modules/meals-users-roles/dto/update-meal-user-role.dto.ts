import { IsInt, IsNotEmpty } from 'class-validator';

export class MealUserRoleUpdateDto {
  @IsNotEmpty({ message: 'O campo de ID é obrigátorio.' })
  @IsInt({ message: 'O campo de ID precisa ser um inteiro.' })
  id: number;

  @IsNotEmpty({ message: 'O campo de ID da subrefeição é obrigátorio.' })
  @IsInt({ message: 'O campo de ID da subrefeição precisa ser um inteiro.' })
  mealId: number;

  @IsNotEmpty({ message: 'O campo de ID do perfil é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do perfil precisa ser um inteiro.' })
  roleId: number;
}
