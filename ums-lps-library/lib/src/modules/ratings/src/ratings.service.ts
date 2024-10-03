import { Observable } from 'rxjs/internal/Observable';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';

import { RatingInterface } from './interfaces/rating.interface';

@Injectable()
export class RatingService {
  constructor(@Inject('RATINGS') private readonly msRatings: ClientProxy) {}

  createRating(data: RatingInterface) {
    return this.msRatings.send('create_rating', data);
  }

  findRatingByMenuMealId(menuMealId: number): Observable<any[]> {
    return this.msRatings.send('find_rating_by_menu_meal_id', menuMealId);
  }

  delete(id: number) {
    return this.msRatings.send('delete_rating', id);
  }
}
