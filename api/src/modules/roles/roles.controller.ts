import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { RolesService } from './roles.service';
import { RoleCreateDto } from './dto/create-role.dto';
import { RoleUpdateDto } from './dto/update-role.dto';
import { RoleInterface } from './interfaces/role.interface';
import { Roles } from '../../shared/decorators/role.decorator';

@Controller('roles')
// @UseGuards(JWTAuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class RolesController {
  constructor(private service: RolesService) {}

  @Get()
  @Roles('ACCESS-PROFILE_LISTAR')
  async findAll(): Promise<RoleInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles('ACCESS-PROFILE_LISTAR')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleInterface> {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles('ACCESS-PROFILE_INCLUIR')
  async create(
    @Body() data: RoleCreateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  @Roles('ACCESS-PROFILE_EDITAR')
  async update(
    @Body() data: RoleUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ role: RoleInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  @Roles('ACCESS-PROFILE_EXCLUIR')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
