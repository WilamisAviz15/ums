import http from "../../shared/services/axios";
import { RoleInterface } from "./interfaces/role.interface";

class RolesService {
  constructor() {}

  async httpGet(): Promise<RoleInterface[]> {
    return (await http.get<RoleInterface, any>("roles/")).data;
  }

  async httpGetById(id: number): Promise<RoleInterface> {
    return (await http.get<any, any>(`roles/${id}`)).data;
  }

  async httpPost(data: RoleInterface): Promise<{ action: RoleInterface; message: string }> {
    const response = await http.post<RoleInterface, any>("roles", { data });
    return response.data;
  }

  async httpPut(data: RoleInterface): Promise<{ action: RoleInterface; message: string }> {
    const response = await http.put<RoleInterface, any>(`roles/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`roles/${id}`, {});
    return response.data;
  }
}

export default new RolesService();
