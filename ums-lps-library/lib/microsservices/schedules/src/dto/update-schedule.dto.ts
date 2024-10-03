import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';

import { ScheduleCreateDto } from './create-schedule.dto';

export class ScheduleUpdateDto extends PartialType(ScheduleCreateDto) {
  @IsNotEmpty({ message: 'O campo de ID é obrigátorio.' })
  @IsInt({ message: 'O campo de ID precisa ser um inteiro.' })
  id: number;
}
