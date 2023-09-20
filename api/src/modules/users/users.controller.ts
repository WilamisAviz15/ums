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
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserFilterInterface } from './interfaces/user-filter.interface';
import { UserInterface } from './interfaces/user.interface';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { UserJwtInterface } from '../../authentication/interfaces/user-jwt.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(
    @Body() data: UserCreateDto,
    @AuthUser() currentAdmin: UserInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.service.create(data, currentAdmin);
  }

  @Get()
  async findAll(
    @Body() filters: UserFilterInterface,
  ): Promise<UserInterface[]> {
    return await this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
    @AuthUser() user: UserJwtInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.service.update(data, user, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
