import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { userService } from "App/Services/UserService";
import { responseUtil } from '../utils/ResponseUtil';

export default class UsersController {
  public async me ({ request, response }: HttpContextContract) {
    const data = await userService.me(request.loggedInUser.id);
    return response.status(200).json(responseUtil.reponseJson({data}, "logged in user details fetched successfully!"))
  }
}
