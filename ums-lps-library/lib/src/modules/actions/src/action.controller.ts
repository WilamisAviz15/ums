import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { ActionInterface } from './interfaces/action.interface';
import { ActionUpdateDto } from './dto/update-action.dto';
import { ActionService } from './action.service';

@Controller()
export class ActionController {
  constructor(private readonly service: ActionService) {}

  @Get('actions')
  getActions() {
    return this.service.getActions();
  }

  @Get('actions/:id')
  getAction(@Param('id') id: string) {
    return this.service.getActionsById(+id);
  }

  @Post('actions')
  createAction(@Body() data: ActionInterface) {
    return this.service.createAction(data);
  }

  @Put('actions/:id')
  async updateAction(@Body() data: ActionUpdateDto, @Param('id', ParseIntPipe) id: number) {
    return this.service.updateAction(data, id);
  }

  @Delete('actions/:id')
  deleteAction(@Param('id') id: string) {
    return this.service.deleteAction(+id);
  }
}
