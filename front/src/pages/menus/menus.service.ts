import http from "../../shared/services/axios";
import { MenuInterface } from "./interfaces/menu.interface";

class MenusService {
  constructor() {}

  async httpGet(): Promise<any> {
    return await http.get<MenuInterface, any>("actions/");
  }

  async httpGetById(id: number): Promise<MenuInterface> {
    return (await http.get<any, any>(`actions/${id}`)).data;
  }

  async httpPost(data: MenuInterface): Promise<{ action: MenuInterface; message: string }> {
    const response = await http.post<MenuInterface, any>("actions", { data });
    return response.data;
  }

  async httpPut(data: MenuInterface): Promise<{ action: MenuInterface; message: string }> {
    const response = await http.put<MenuInterface, any>(`actions/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`actions/${id}`, {});
    return response.data;
  }
}

export default new MenusService();
