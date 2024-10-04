import { SubMealInterface } from '../../submeals/interfaces/submeal.inteface';

export interface MealInterface {
  id: number;
  name: string;
  price: string;
  submeals?: SubMealInterface[];
}
