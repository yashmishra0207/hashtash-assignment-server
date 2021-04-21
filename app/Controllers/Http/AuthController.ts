import Hash from '@ioc:Adonis/Core/Hash';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthenticatedException from 'App/Exceptions/UnauthenticatedException';
import { jwtService } from 'App/Services/JWTService';
import { userService } from 'App/Services/UserService';
import LoginValidator from 'App/Validators/LoginValidator';
import SignUpValidator from 'App/Validators/SignUpValidator';
import { responseUtil } from '../utils/ResponseUtil';

export default class AuthController {
    public async login ({ request, response }: HttpContextContract) {
        const sanitizedPayload = await request.validate(LoginValidator);
        const { email, password } = sanitizedPayload;
        const user = await userService.find('email', email);
console.log('here')
        if (!user || !user.password) {
            throw UnauthenticatedException.invalidLoginDetails();
        }
        const verified = await Hash.verify(user.password, password);
        if (!verified) {
            throw UnauthenticatedException.invalidLoginDetails();
        }
        const token = await jwtService.sign({ sub: user.id });

        return response.status(200).json(responseUtil.reponseJson({ user, token }, "logged in successfully!"));
    }

    public async signup ({ request, response }: HttpContextContract) {
        const sanitizedPayload = await request.validate(SignUpValidator);
        const user = await userService.create(sanitizedPayload);
        return response.status(200).json(responseUtil.reponseJson({ user }, "account created successfully!"));
    }
}
