import http from "../../shared/services/axios";
import { MenuMealInterface } from "./interfaces/menu-meal.interface";

class MenuMealService {
  constructor() {}

  async httpGet(): Promise<MenuMealInterface[]> {
    return (await http.get<any, any>("menu-meal")).data;
  }

  async httpGetById(id: number): Promise<MenuMealInterface> {
    return (await http.get<any, any>(`menu-meal/${id}`)).data;
  }

  async httpPost(data: MenuMealInterface): Promise<{ action: MenuMealInterface; message: string }> {
    const response = await http.post<MenuMealInterface, any>("menu-meal", { data });
    return response.data;
  }

  async httpPut(data: MenuMealInterface): Promise<{ action: MenuMealInterface; message: string }> {
    const response = await http.put<MenuMealInterface, any>(`menu-meal/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`menu-meal/${id}`, {});
    return response.data;
  }
}

export default new MenuMealService();
