import http from "../../shared/services/axios";
import { AuthLoginInterface } from "./interfaces/auth-login.interface";

class AuthService {
  constructor() {}

  async httpPost(data: AuthLoginInterface): Promise<{ token: string }> {
    const response = await http.post<AuthLoginInterface, { token: string }>("auth/login/", { data });
    return response.data;
  }

  setTokenToStorage(accessToken: string): void {
    localStorage.setItem("access_token", accessToken);
  }

  getTokenToStorage(accessToken: string): string | null {
    return localStorage.getItem("access_token");
  }
}
export default new AuthService();
