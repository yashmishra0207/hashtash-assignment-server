import { UserCreateDTO } from "App/Models/DTOs/UserCreateDTO.dto";
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

  async create (data: UserCreateDTO) {
    const user = await User.create(data);
    return user;
  }
}
export const userService = UserService.getInstance()
