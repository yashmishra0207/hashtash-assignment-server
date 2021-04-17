import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { tweetService } from 'App/Services/TweetService';
import TweetCreateValidator from 'App/Validators/TweetCreateValidator';
import { responseUtil } from '../utils/ResponseUtil';

export default class TweetsController {
  public async create ({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(TweetCreateValidator);
    const { id } = request.loggedInUser;
    const createdPost = await tweetService.create({ userId: id, ...sanitizedPayload });
    return response.status(200).json(responseUtil.reponseJson({ createdPost }, "tweeted successfully!"));
  }
}
