import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { userService } from "App/Services/UserService";
import UserFollowerValidator from 'App/Validators/UserFollowerValidator';
import UserFollowingValidator from 'App/Validators/UserFollowingValidator';
import UserFollowValidator from 'App/Validators/UserFollowValidator';
import UserSearchValidator from 'App/Validators/UserSearchValidator';
import UserUnFollowValidator from 'App/Validators/UserUnFollowValidator';
import { responseUtil } from '../utils/ResponseUtil';

export default class UsersController {
  public async me ({ request, response }: HttpContextContract) {
    const data = await userService.me(request.loggedInUser.id);
    return response.status(200).json(responseUtil.reponseJson({ data }, "logged in user details fetched successfully!"));
  }

  public async show ({ request, response }: HttpContextContract) {
    const userId = request.param('id');
    const foundUser = await userService.find('id', userId);
    let message = "user found"
    if (!foundUser) message = "user not found";
    return response.status(200).json(responseUtil.reponseJson({ foundUser }, message));
  }

  public async search ({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(UserSearchValidator);
    const users = await userService.search(sanitizedPayload);
    if (users.length == 0) {
      return response.status(200).json({
        users,
        message: "no user found with matching handle"
      })
    }
    return response.status(200).json({
      users,
      message: "users fetched successfully"
    })
  }

  public async follow ({ request, response }: HttpContextContract) {
    const userId = request.loggedInUser.id;
    const { userIdToBeFollowed } = await request.validate(UserFollowValidator);
    if (userId == userIdToBeFollowed) {
      return response.status(422).json({
        message: "You can't follow yourself",
      });
    }
    await userService.follow(userIdToBeFollowed, userId);
    return response.status(200).json({
      message: "User followed successfully",
    })
  }

  public async unFollow ({ request, response }: HttpContextContract) {
    const userId = request.loggedInUser.id;
    const { userIdToBeUnFollowed } = await request.validate(UserUnFollowValidator);
    await userService.unFollow(userIdToBeUnFollowed, userId);
    return response.status(200).json({
      message: "User unfollowed successfully",
    })
  }

  public async followers ({ request, response }: HttpContextContract) {
    let sanitizedPayload = await request.validate(UserFollowerValidator);
    const followers = await userService.followers(sanitizedPayload, request.loggedInUser.id);
    if (followers.length == 0) {
      return response.status(200).json({
        followers,
        message: "no follower found"
      })
    }
    return response.status(200).json({
      followers,
      message: "followers fetched successfully"
    })
  }

  public async followings ({ request, response }: HttpContextContract) {
    let sanitizedPayload = await request.validate(UserFollowingValidator);
    const followings = await userService.followings(sanitizedPayload, request.loggedInUser.id);
    if (followings.length == 0) {
      return response.status(200).json({
        followings,
        message: "no following found"
      })
    }
    return response.status(200).json({
      followings,
      message: "followings fetched successfully"
    })
  }
}
