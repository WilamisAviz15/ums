import http from "../../shared/services/axios";
import { ConfigInterface } from "./interfaces/config.interface";

class WizardService {
  constructor() {}

  async httpPost(data: ConfigInterface): Promise<{ message: string }> {
    const response = await http.post<ConfigInterface, any>("config/generate", { data });
    return response.data;
  }
}

export default new WizardService();
