import { IsNotEmpty, IsInt } from 'class-validator';

export class ScheduleCreateDto {
  @IsNotEmpty({ message: 'O campo de ID do Usuário é obrigátorio.' })
  @IsInt({ message: 'O campo de ID do Usuário precisa ser um inteiro.' })
  userId: number;

  @IsNotEmpty({ message: 'O campo de ID da refeição é obrigátorio.' })
  @IsInt({ message: 'O campo de ID da refeição precisa ser um inteiro.' })
  mealId: number;

  @IsNotEmpty({ message: 'O campo data é obrigatório.' })
  date: Date;
}
