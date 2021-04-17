import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthenticatedException from 'App/Exceptions/UnauthenticatedException';
import User from 'App/Models/User';
import { jwtService } from 'App/Services/JWTService';

export default class Auth {
  public async handle ({request}: HttpContextContract, next: () => Promise<void>) {
    
    const token = (request.headers().authorization)?.slice(7);
    if(!token) {
      throw UnauthenticatedException.noToken();
    }
    try {      
      const data: any = await jwtService.verify(token);
      console.log(data);
      const user = await User.findOrFail(data.sub);
      request.loggedInUser = user;
    } catch(e) {
      if(e.name === 'TokenExpiredError') {
        throw UnauthenticatedException.tokenExpired();
      }
      throw UnauthenticatedException.invalidToken();
    }

    await next()
  }
}
