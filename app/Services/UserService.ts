import { UserCreateDTO } from "App/Models/DTOs/UserCreateDTO.dto";
import { UserFollowerDTO } from "App/Models/DTOs/UserFollowerDTO.dto";
import { UserFollowingDTO } from "App/Models/DTOs/UserFollowingDTO.dto";
import { UserQueryStringDTO } from "App/Models/DTOs/UserQueryStringDTO.dto";
import Follower from "App/Models/Follower";
import User from "App/Models/User";

class UserService {
  static getInstance () {
    return new UserService()
  }

  async me (userId: number) {
    return await User.find(userId);
  }

  async find (key: string, value: any) {
    return await User.findBy(key, value);
  }

  async search (query: UserQueryStringDTO): Promise<User[]> {
    const { handle, page, limit } = query;
    const pageNo = page ? page : 1;
    const pageLimit = limit ? limit : 10;
    let users = User.query().where('handle', 'LIKE', `%${handle}%`).paginate(pageNo, pageLimit);
    return users;
  }

  async create (data: UserCreateDTO) {
    const user = await User.create(data);
    return user;
  }

  async follow (userId: number, followerId: number) {
    const follower = await Follower.firstOrCreate({
      userId,
      followerId
    })
    return follower;
  }

  async unFollow (userId: number, followerId: number) {
    const row = await Follower.query().where({ 'follower_id': followerId, 'user_id': userId }).first();
    await row?.delete()
    return row;
  }

  async followers (payload: UserFollowerDTO, loggedInUserId: number) {
    const { id, page, limit } = payload;
    const userId = id ? id : loggedInUserId;
    const pageNo = page ? page : 1;
    const pageLimit = limit ? limit : 10;
    const followers = await Follower.query().where('user_id', userId).orderBy('created_at', "desc").paginate(pageNo, pageLimit);
    return followers;
  }

  async followings (payload: UserFollowingDTO, loggedInUserId: number) {
    const { id, page, limit } = payload;
    const userId = id ? id : loggedInUserId;
    const pageNo = page ? page : 1;
    const pageLimit = limit ? limit : 10;
    const followings = await Follower.query().where('follower_id', userId).orderBy('created_at', "desc").paginate(pageNo, pageLimit);
    return followings;
  }
}
export const userService = UserService.getInstance()
