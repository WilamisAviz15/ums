import http from "../../../shared/services/axios";
import { ProfileInterface } from "../interfaces/profile.interface";

class ProfileService {
  constructor() {}

  async httpPut(data: ProfileInterface): Promise<{ action: ProfileInterface; message: string }> {
    const response = await http.patch<ProfileInterface, any>("profile/", { data });
    return response.data;
  }
}

export default new ProfileService();
