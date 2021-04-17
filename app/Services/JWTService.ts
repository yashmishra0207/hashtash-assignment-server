import { appKey } from 'Config/app';
import jwt from 'jsonwebtoken';
import UnauthenticatedException from 'App/Exceptions/UnauthenticatedException';
import { tokenExpiry } from 'Config/app';

class JWTService {
  static getInstance () {
    return new JWTService();
  }

  async sign (sub: object) {
    const token = jwt.sign(sub, appKey, {
      expiresIn: parseInt(tokenExpiry),
    });
    return token;
  }

  async verify (token: string) {
    try {
      const data = jwt.verify(token, appKey);
      return data;
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw UnauthenticatedException.tokenExpired();
      }
      throw UnauthenticatedException.invalidToken();
    }
  }

}
export const jwtService = JWTService.getInstance();