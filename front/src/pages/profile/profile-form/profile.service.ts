import { UserInterface } from "../interfaces/user.interface";
import http from "../../../shared/services/axios";

class ProfileService {
  constructor() {}

  async httpPut(data: UserInterface): Promise<{ action: UserInterface; message: string }> {
    const response = await http.patch<UserInterface, any>("profile/", { data });
    return response.data;
  }
}

export default new ProfileService();
