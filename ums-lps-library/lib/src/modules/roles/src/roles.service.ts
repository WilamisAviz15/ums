import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { RoleInterface } from './interfaces/role.interface';
import { RoleUpdateDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(@Inject('ROLES') private readonly msRoles: ClientProxy) {}

  getRoles() {
    return this.msRoles.send({ cmd: 'get_roles' }, {});
  }

  getRolesById(id: number) {
    return this.msRoles.send({ cmd: 'get_roles_by_id' }, id);
  }

  createRole(data: RoleInterface) {
    return this.msRoles.send('create_role', data);
  }

  updateRole(data: RoleUpdateDto, id: number) {
    return this.msRoles.send('update_role', { data, id });
  }

  deleteRole(id: number) {
    return this.msRoles.send('delete_role', id);
  }
}
