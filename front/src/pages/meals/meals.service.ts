import http from "../../shared/services/axios";
import { MealInterface } from "./interfaces/meal.interface";

class MealService {
  constructor() {}

  async httpGet(): Promise<MealInterface[]> {
    return (await http.get<MealInterface, any>("meals/")).data;
  }

  async httpGetById(id: number): Promise<MealInterface> {
    return (await http.get<any, any>(`meals/${id}`)).data;
  }

  async httpPost(data: MealInterface): Promise<{ action: MealInterface; message: string }> {
    const response = await http.post<MealInterface, any>("meals", { data });
    return response.data;
  }

  async httpPut(data: MealInterface): Promise<{ action: MealInterface; message: string }> {
    const response = await http.put<MealInterface, any>(`meals/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`meals/${id}`, {});
    return response.data;
  }
}

export default new MealService();
