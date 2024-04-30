import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PrivilegeDto } from './privilege.dto';

export class ActionsMenuDto {
  @IsNotEmpty({ message: 'Informar ID da ação.' })
  id: number;

  @IsOptional()
  @IsArray({ message: 'Array inválido' })
  @ValidateNested()
  @Type(() => PrivilegeDto)
  privileges: PrivilegeDto[];
}
