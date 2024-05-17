import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ActionsService } from './actions.service';
import { ActionFilterInterface } from './interfaces/action-filter.interface';
import { ActionInterface } from './interfaces/action.interface';
import { ActionCreateDto } from './dto/create-action.dto';
import { ActionUpdateDto } from './dto/update-action.dto';

@Controller()
export class ActionsController {
  constructor(private readonly service: ActionsService) {}

  @MessagePattern('get_actions')
  async findAll(
    @Body() filters: ActionFilterInterface,
  ): Promise<ActionInterface[]> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('create_action')
  async create(
    @Body() data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.create(data);
  }

  @MessagePattern('update_action')
  async update(
    @Body()
    { id, data }: { id: number; data: ActionUpdateDto },
  ): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.update(data, id);
  }

  @MessagePattern('delete_action')
  async delete(@Body() id: string): Promise<{ message: string }> {
    return this.service.delete(+id);
  }
}
