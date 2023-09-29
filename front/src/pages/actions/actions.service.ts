import http from "../../shared/services/axios";
import { ActionInterface } from "./interfaces/action.interface";

class ActionsService {
  constructor() {}

  async httpGet(): Promise<any> {
    return await http.get<any, any>("actions/");
  }

  async httpPost(data: ActionInterface): Promise<{ action: ActionInterface; message: string }> {
    const response = await http.post<ActionInterface, any>("actions", { data });
    return response.data;
  }
}

export default new ActionsService();
