import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { tweetService } from 'App/Services/TweetService';
import FeedValidator from 'App/Validators/FeedValidator';
import TweetCreateValidator from 'App/Validators/TweetCreateValidator';
import TweetSearchStringValidator from 'App/Validators/TweetSearchStringValidator';
import UserTweetShowValidator from 'App/Validators/UserTweetShowValidator';
import { responseUtil } from '../utils/ResponseUtil';

export default class TweetsController {
  public async create ({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(TweetCreateValidator);
    const { id } = request.loggedInUser;
    const createdPost = await tweetService.create({ userId: id, ...sanitizedPayload });
    return response.status(200).json(responseUtil.reponseJson({ createdPost }, "tweeted successfully!"));
  }

  public async list ({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(FeedValidator);
    const feed = await tweetService.list(sanitizedPayload, request.loggedInUser.id);
    if (feed.length == 0) {
      return response.status(200).json({
        message: 'Your feed is empty'
      });
    }
    return response.status(200).json({
      feed,
      message: 'Feed fetched successfully'
    });
  }
  
  public async search ({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(TweetSearchStringValidator);
    const foundTweets = await tweetService.search(sanitizedPayload);
    if (foundTweets.length == 0) {
      return response.status(200).json({
        message: 'No Tweet found'
      });
    }
    return response.status(200).json({
      foundTweets,
      message: 'Tweets fetched successfully'
    })
  }

  public async myTweets ({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(UserTweetShowValidator);
    const myTweets = await tweetService.myTweets(sanitizedPayload, request.loggedInUser.id);
    if (myTweets.length == 0) {
      return response.status(200).json({
        message: 'You have not tweeted yet'
      });
    }
    return response.status(200).json({
      myTweets,
      message: 'Tweets fetched successfully'
    })
  }
}
