import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ActionsService } from './actions.service';
import { ActionInterface } from './interfaces/action.interface';
import { Roles } from '../../shared/decorators/role.decorator';
import { ActionCreateDto } from './dto/create-action.dto';
import { ActionUpdateDto } from './dto/update-action.dto';

@Controller('actions')
export class ActionsController {
  constructor(private service: ActionsService) {}

  @Get()
  @Roles('ACTIONS_LISTAR')
  async findAll(): Promise<ActionInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles('ACTIONS_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ActionInterface> {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles('ACTIONS_INCLUIR')
  async create(
    @Body() data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.create(data);
  }

  @Put(':id')
  @Roles('ACTIONS_EDITAR')
  async update(
    @Body() data: ActionUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @Delete(':id')
  @Roles('ACTIONS_EXCLUIR')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
