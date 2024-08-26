import http from "../../shared/services/axios";
import { MenuMealInterface } from "./interfaces/menu-meal.interface";

class MenuMealService {
  constructor() {}

  async httpGet(): Promise<MenuMealInterface[]> {
    return (await http.get<any, any>("menu-meals")).data;
  }

  async httpGetById(id: number): Promise<MenuMealInterface> {
    return (await http.get<any, any>(`menu-meals/${id}`)).data;
  }

  async httpPost(data: MenuMealInterface): Promise<{ action: MenuMealInterface; message: string }> {
    const response = await http.post<MenuMealInterface, any>("menu-meals", { data });
    return response.data;
  }

  async httpPut(data: MenuMealInterface): Promise<{ action: MenuMealInterface; message: string }> {
    const response = await http.put<MenuMealInterface, any>(`menu-meals/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`menu-meals/${id}`, {});
    return response.data;
  }
}

export default new MenuMealService();
