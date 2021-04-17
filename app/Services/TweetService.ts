import { TweetQueryStringDTO } from "App/Models/DTOs/TweetQueryStringDTO.dto";
import { TweetCreateDTO } from "App/Models/DTOs/TweetCreateDTO.dto";
import Tweet from "App/Models/Tweet";
import { FeedListDTO } from "App/Models/DTOs/FeedListDTO.dto";
import Follower from "App/Models/Follower";
import { TweetSelfDTO } from "App/Models/DTOs/TweetSelfDTO.dto";

class TweetService {
  static getInstance () {
    return new TweetService();
  }

  async create (payload: TweetCreateDTO) {
    return await Tweet.create(payload);
  }

  async list (payload: FeedListDTO, loggedInUserId: number) {
    const { page, limit } = payload;
    const pageNo = page ? page : 1;
    const pageLimit = limit ? limit : 10;
    let feed = Tweet.query().whereIn('user_id', Follower.query().select('user_id').distinct().where('follower_id', loggedInUserId)).orderBy('created_at', "desc").paginate(pageNo, pageLimit);
    return feed;
  }

  async search (query: TweetQueryStringDTO) {
    const { search, isHashtag, page, limit } = query;
    const pageNo = page ? page : 1;
    const pageLimit = limit ? limit : 10;
    let rootQuery = Tweet.query().where('hashtags', 'LIKE', `%${search}%`);
    if (!isHashtag) {
      rootQuery = rootQuery.orWhere('title', 'LIKE', `%${search}%`).orWhere('content', 'LIKE', `%${search}%`);
    }
    let tweets = rootQuery.orderBy('created_at', "desc").paginate(pageNo, pageLimit);
    return tweets;
  }

  async myTweets (payload: TweetSelfDTO, loggedInUserId: number) {
    const { id, page, limit } = payload;
    const userId = id ? id : loggedInUserId;
    const pageNo = page ? page : 1;
    const pageLimit = limit ? limit : 10;
    const myTweets = Tweet.query().where('user_id', userId).orderBy('created_at', "desc").paginate(pageNo, pageLimit);
    return myTweets;
  }
}
export const tweetService = TweetService.getInstance();