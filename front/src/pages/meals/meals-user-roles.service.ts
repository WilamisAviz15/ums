import http from "../../shared/services/axios";
import { MealUserRoleInterface } from "./interfaces/meal-user-role.interface";

class MealUserRolesService {
  constructor() {}

  async httpGet(): Promise<any[]> {
    return (await http.get<any, any>("meals-user-roles")).data;
  }

  async httpGetByMealId(mealId: number): Promise<any[]> {
    return (await http.get<any, any>(`meals-user-roles/${mealId}`)).data;
  }

  async httpPost(data: MealUserRoleInterface[]): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    const response = await http.post<MealUserRoleInterface[], any>("meals-user-roles", { data });
    return response.data;
  }

  async httpPut(mealId: number, data: MealUserRoleInterface[]): Promise<{ mealUserRoles: MealUserRoleInterface[]; message: string }> {
    const response = await http.put<MealUserRoleInterface[], any>(`meals-user-roles/${mealId}`, { data });
    return response.data;
  }
}
export default new MealUserRolesService();
