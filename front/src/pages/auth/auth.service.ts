import { BehaviorSubject, take } from "rxjs";

import http from "../../shared/services/axios";
import { AuthLoginInterface } from "./interfaces/auth-login.interface";
import { JwtServiceUtil } from "../../shared/utils/jwt-service.util";

class AuthService {
  private bearer$: BehaviorSubject<any> = new BehaviorSubject(null);
  private user$: BehaviorSubject<any> = new BehaviorSubject(null);
  private privileges$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    this.recoveryDataFromLocalStorage();
  }

  async httpPost(data: AuthLoginInterface): Promise<{ token: string }> {
    const response = await http.post<AuthLoginInterface, { token: string }>("auth/login/", { data });
    return response.data;
  }

  async login(data: AuthLoginInterface): Promise<any> {
    const jwt: any = await this.httpPost(data);
    return this.saveUser(jwt.accessToken);
  }

  getUser() {
    return this.user$.getValue();
  }

  getUser$() {
    return this.user$.asObservable();
  }

  logout() {
    this.user$.next(null);
    localStorage.clear();
  }

  saveUser(jwt: string): boolean | unknown {
    try {
      const jwtDecoded = JwtServiceUtil.getDecodedAccessToken(jwt);
      if (!jwtDecoded) {
        throw new Error();
      }

      localStorage.setItem("user", JSON.stringify(jwtDecoded));
      localStorage.setItem("access_token", jwt);

      this.user$.next(jwtDecoded);
      this.bearer$.next(jwt);
      return true;
    } catch (error) {
      return error;
    }
  }

  private recoveryDataFromLocalStorage() {
    const data = localStorage.getItem("user");
    const bearer = localStorage.getItem("access_token");
    if (data && bearer) {
      const user = JSON.parse(data);
      this.user$.next(user);
      this.bearer$.next(bearer);
    }
  }
}
export default new AuthService();
