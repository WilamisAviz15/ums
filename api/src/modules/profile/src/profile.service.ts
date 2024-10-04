import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { EditPersonalDataDto } from './dto/edit-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@Inject('PROFILE') private readonly msProfile: ClientProxy) {}

  updateProfile(profile: EditPersonalDataDto) {
    return this.msProfile.send('update_profile', profile);
  }
}
