import { Exception }           from '@poppinss/utils';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UnauthenticatedException extends Exception {
  private constructor(message: string) {
    super(message);
  }

  public static noToken() {
    return new UnauthenticatedException('No Token found!');
  }
  public static invalidToken() {
    return new UnauthenticatedException('Token is not valid!');
  }
  public static invalidLoginDetails() {
    return new UnauthenticatedException('Login details do not match!');
  }
  public static tokenExpired() {
    return new UnauthenticatedException('Token has expired, login again!');
  }

  public handle(error: any, ctx: HttpContextContract) {
    ctx.response.status(401).json({
      errors: [{ message: error.message }],
    });
  }
}