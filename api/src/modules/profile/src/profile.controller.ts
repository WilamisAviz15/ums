import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { EditPersonalDataDto } from './dto/edit-profile.dto';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Patch('profile')
  updateProfile(@Body() data: EditPersonalDataDto) {
    return this.service.updateProfile(data);
  }
}
