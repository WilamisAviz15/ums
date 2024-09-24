import { SubMealInterface } from "./submeal.interface";

export interface MealInterface {
  id?: number;
  name: string;
  price: string;
  submeal: SubMealInterface[];
}
