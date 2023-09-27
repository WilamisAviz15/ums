import { PartialType } from '@nestjs/mapped-types';
import { ScheduleCreateDto } from './create-schedule.dto';

export class ScheduleUpdateDto extends PartialType(ScheduleCreateDto) {}
