import { PartialType } from '@nestjs/mapped-types';
import { MealCreateDto } from './create-meal.dto';

export class MealUpdateDto extends PartialType(MealCreateDto) {}
