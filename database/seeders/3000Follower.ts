import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Follower from 'App/Models/Follower'
import User from 'App/Models/User'
import * as faker from 'faker'

export default class FollowerSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const users = await User.query().select('id')
    let userIds: Array<number> = []
    users.forEach((user) => {
      userIds.push(user.id)
    })
    let followers: any[] = []

    for (let i = 0; i < 150; i++) {
      let uid: number;
      let fid: number;
      while (true) {
        uid = faker.random.arrayElement(userIds)
        fid = faker.random.arrayElement(userIds)
        if (uid !== fid) break
      }
      followers = [
        ...followers,
        {
          user_id: uid,
          follower_id: fid,
        },
      ]
    }
    await Follower.createMany(followers)
  }
}
