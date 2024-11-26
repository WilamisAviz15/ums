import { Body, Controller, Patch } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ProfileService } from './profile.service';
import { EditPersonalDataDto } from './dto/edit-profile.dto';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Patch()
  // async update(@Body() body: EditPersonalDataDto): Promise<{
  //   user: UserJwtInterface;
  //   accessToken: string;
  //   message: string;
  // }> {
  //   return await this.service.update(body);
  // }
  async update(@Body() body: EditPersonalDataDto) {
    return body;
  }
}
