import http from '../../shared/services/axios';
import { ConfigInterfaceInit } from './interfaces/config.interface';

class WizardService {
  constructor() {}

  async httpPost(data: ConfigInterfaceInit): Promise<{ message: string }> {
    const response = await http.post<ConfigInterfaceInit, any>('config/generate', { data });
    return response.data;
  }
}

export default new WizardService();
