import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { AuthUser } from './decorators/user.decorator';
import { UserInterface } from './interfaces/user.interface';
import { UserCreateDto } from './dto/create-user.dto';
import { UserFilterInterface } from './interfaces/user-filter.interface';
import { UserUpdateDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() data: UserCreateDto, @AuthUser() currentUser: UserInterface): Promise<{ user: UserInterface; message: string }> {
    return await this.service.create(data, currentUser);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDto) {
    return this.service.update(data, +id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Get()
  async findAll(@Body() filters: UserFilterInterface): Promise<UserInterface[]> {
    return await this.service.findAll(filters);
  }

  @Post('findUserByEmail')
  async findByEmail(@Body() email: string): Promise<UserInterface> {
    return await this.service.findByEmail(email);
  }

  @Post('findUserByCpf')
  async findByCPF(@Body() data: { cpf: string }): Promise<UserInterface> {
    return await this.service.findLoginByCpf(data.cpf);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserInterface> {
    return await this.service.findOne(+id);
  }
}
