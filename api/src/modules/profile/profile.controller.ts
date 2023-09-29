import { Controller, Body, Patch } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { UserJwtInterface } from '../../authentication/interfaces/user-jwt.interface';
import { EditPersonalDataDto } from './dto/edit-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}
  @Patch('')
  async editProfile(@Body() body: EditPersonalDataDto): Promise<{
    user: UserJwtInterface;
    accessToken: string;
    message: string;
  }> {
    return this.service.update(body);
  }
}
