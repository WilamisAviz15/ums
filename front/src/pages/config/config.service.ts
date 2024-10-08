import { BehaviorSubject } from "rxjs";

import http from "../../shared/services/axios";
import { ConfigInterface } from "./interfaces/config.interface";

class ConfigService {
  private config$ = new BehaviorSubject<ConfigInterface | null>(null);
  constructor() {}

  getConfig(): ConfigInterface | null {
    return this.config$.getValue();
  }

  async httpGet() {
    const currentConfig = this.config$.getValue();

    if (currentConfig) {
      return currentConfig;
    }
    const configData = (await http.get<ConfigInterface, any>("config/")).data as ConfigInterface;
    this.config$.next(configData);

    return configData;
  }

  async httpPut(data: ConfigInterface): Promise<{ config: ConfigInterface; message: string }> {
    const response = await http.put<ConfigInterface, any>(`config/`, { data });
    this.config$.next(response.data);
    return response.data;
  }
}

export default new ConfigService();
