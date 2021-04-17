import { TweetCreateDTO } from "App/Models/DTOs/TweetCreateDTO.dto";
import Tweet from "App/Models/Tweet";

class TweetService {
  static getInstance () {
    return new TweetService();
  }

  async create (payload: TweetCreateDTO) {
    return await Tweet.create(payload);
  }
}
export const tweetService = TweetService.getInstance();