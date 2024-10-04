import { IsInt, IsNotEmpty } from 'class-validator';

export class MealUserRoleCreateDto {
  @IsNotEmpty({ message: 'O campo de ID da refeição é obrigátorio.' })
  @IsInt({ message: 'O campo de ID da refeição precisa ser um inteiro.' })
  mealId: number;

  @IsNotEmpty({ message: 'O campo de ID do perfil é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do perfil precisa ser um inteiro.' })
  roleId: number;
}
