import {
  IsBoolean,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ModuleOptionsDto {
  @IsOptional()
  @IsObject()
  options: { [key: string]: boolean };
}

class ModuleConfigDto {
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ValidateNested()
  @Type(() => ModuleOptionsDto)
  @IsOptional()
  options?: ModuleOptionsDto;
}

export class UpdateConfigDto {
  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  AuthenticationModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  RoleModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  UserModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  UserRoleModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  ScheduleModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  ActionModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  MenuModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  MenuGroupModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  MealModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  ProfileModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  MenuMealModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  RatingModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  SubMealsModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  MealsUserRolesModule?: ModuleConfigDto;

  @ValidateNested()
  @Type(() => ModuleConfigDto)
  @IsOptional()
  PaymentsModule?: ModuleConfigDto;
}
