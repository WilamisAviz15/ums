import { MealUserRoleInterface } from "./meal-user-role.interface";
import { SubMealInterface } from "./submeal.interface";

export interface MealInterface {
  id?: number;
  name: string;
  price: string;
  submeals: SubMealInterface[];
  mealUserRoles: MealUserRoleInterface[];
}
