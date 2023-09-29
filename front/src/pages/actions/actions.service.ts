import http from "../../shared/services/axios";

class ActionsService {
  constructor() {}

  async httpGet(): Promise<any> {
    return await http.get<any, any>("actions/");
  }
}

export default new ActionsService();
