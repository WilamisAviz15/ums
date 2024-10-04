import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';
import { Observable } from 'rxjs/internal/Observable';

import { ActionInterface } from './interfaces/action.interface';
import { ActionUpdateDto } from './dto/update-action.dto';

@Injectable()
export class ActionService {
  constructor(@Inject('ACTIONS') private readonly msActions: ClientProxy) {}

  getActions() {
    return this.msActions.send('get_actions', {});
  }

  getActionsById(id: number) {
    return this.msActions.send('get_actions_by_id', { id });
  }

  createAction(data: ActionInterface): Observable<any> {
    return this.msActions.send('create_action', data);
  }

  updateAction(data: ActionUpdateDto, id: number) {
    return this.msActions.send('update_action', { data, id });
  }

  deleteAction(id: number) {
    return this.msActions.send('delete_action', id);
  }
}
