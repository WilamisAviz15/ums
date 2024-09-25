import http from "../../shared/services/axios";
import { SubMealInterface } from "./interfaces/submeal.interface";

class SubMealService {
  constructor() {}

  async httpGet(): Promise<SubMealInterface[]> {
    return (await http.get<SubMealInterface, any>("submeals/")).data;
  }

  async httpGetById(id: number): Promise<SubMealInterface> {
    return (await http.get<any, any>(`submeals/${id}`)).data;
  }

  async httpGetByMealId(id: number): Promise<SubMealInterface[]> {
    return (await http.get<any, any>(`submeals/byMealId/${id}`)).data;
  }

  async httpPost(data: SubMealInterface): Promise<{ meal: SubMealInterface; message: string }> {
    const response = await http.post<SubMealInterface, any>("submeals", { data });
    return response.data;
  }

  async httpPut(data: SubMealInterface): Promise<{ meal: SubMealInterface; message: string }> {
    const response = await http.put<SubMealInterface, any>(`submeals/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`submeals/${id}`, {});
    return response.data;
  }
}

export default new SubMealService();
