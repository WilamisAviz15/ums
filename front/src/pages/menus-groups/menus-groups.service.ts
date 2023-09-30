import http from "../../shared/services/axios";
import { MenuGroupInterface } from "./interfaces/menu-group.interface";

class MenusGroupsService {
  constructor() {}

  async httpGet(): Promise<MenuGroupInterface[]> {
    return (await http.get<MenuGroupInterface, any>("menus-groups/")).data;
  }

  async httpGetById(id: number): Promise<MenuGroupInterface> {
    return (await http.get<any, any>(`menus-groups/${id}`)).data;
  }

  async httpPost(data: MenuGroupInterface): Promise<{ action: MenuGroupInterface; message: string }> {
    const response = await http.post<MenuGroupInterface, any>("menus-groups", { data });
    return response.data;
  }

  async httpPut(data: MenuGroupInterface): Promise<{ action: MenuGroupInterface; message: string }> {
    const response = await http.put<MenuGroupInterface, any>(`menus-groups/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`menus-groups/${id}`, {});
    return response.data;
  }
}

export default new MenusGroupsService();
