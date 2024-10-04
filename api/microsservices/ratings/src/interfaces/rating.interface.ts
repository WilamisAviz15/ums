export interface RatingInterface {
  id: number;
  username: string;
  message: string;
  stars: number;
  menuMealId: number;
  createdAt?: Date;
}
