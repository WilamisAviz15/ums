import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ActionsService } from './actions.service';
import { ActionFilterInterface } from './interfaces/action-filter.interface';
import { ActionInterface } from './interfaces/action.interface';
import { ActionCreateDto } from './dto/create-action.dto';

@Controller()
export class ActionsController {
  constructor(private readonly service: ActionsService) {}

  @MessagePattern('get_actions')
  async findAll(
    @Body() filters: ActionFilterInterface,
  ): Promise<ActionInterface[]> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('create_actions')
  async create(
    @Body() data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    return await this.service.create(data);
  }
}
