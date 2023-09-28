import jwt_decode from "jwt-decode";

export class JwtServiceUtil {
  constructor() {}

  static getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      throw error;
    }
  }
}
