import http from "../../shared/services/axios";
import authService from "../auth/auth.service";
import { UserInterface } from "./interfaces/user.interface";

class UsersService {
  constructor() {}

  async httpGet(): Promise<UserInterface[]> {
    return (await http.get<UserInterface, any>("users")).data;
  }

  async httpGetById(id: number): Promise<UserInterface> {
    return (await http.get<any, any>(`users/${id}`)).data;
  }

  async httpPost(data: UserInterface): Promise<{ action: UserInterface; message: string }> {
    const response = await http.post<UserInterface, any>("users", { data });
    return response.data;
  }

  async httpPut(data: UserInterface): Promise<{ action: UserInterface; message: string }> {
    const response = await http.put<UserInterface, any>(`users/${data.id}`, { data });
    return response.data;
  }

  async httpDelete(id: number): Promise<{ message: string }> {
    const response = await http.delete<any, any>(`users/${id}`, {});
    return response.data;
  }
}

export default new UsersService();
