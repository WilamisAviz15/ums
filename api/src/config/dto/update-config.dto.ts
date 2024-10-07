import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateConfigDto {
  @IsBoolean()
  @IsOptional()
  AuthenticationModule?: boolean;

  @IsBoolean()
  @IsOptional()
  RoleModule?: boolean;

  @IsBoolean()
  @IsOptional()
  UserModule?: boolean;

  @IsBoolean()
  @IsOptional()
  UserRoleModule?: boolean;

  @IsBoolean()
  @IsOptional()
  ScheduleModule?: boolean;

  @IsBoolean()
  @IsOptional()
  ActionModule?: boolean;

  @IsBoolean()
  @IsOptional()
  MenuModule?: boolean;

  @IsBoolean()
  @IsOptional()
  MenuGroupModule?: boolean;

  @IsBoolean()
  @IsOptional()
  MealModule?: boolean;

  @IsBoolean()
  @IsOptional()
  ProfileModule?: boolean;

  @IsBoolean()
  @IsOptional()
  MenuMealModule?: boolean;

  @IsBoolean()
  @IsOptional()
  RatingModule?: boolean;

  @IsBoolean()
  @IsOptional()
  SubMealsModule?: boolean;

  @IsBoolean()
  @IsOptional()
  MealsUserRolesModule?: boolean;

  @IsBoolean()
  @IsOptional()
  PaymentsModule?: boolean;
}
