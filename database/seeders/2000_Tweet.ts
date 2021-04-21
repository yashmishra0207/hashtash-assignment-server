import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tweet from 'App/Models/Tweet'
import User from 'App/Models/User'
import * as faker from 'faker'

export default class TweetSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const users = await User.query().select('id')
    let userIds: Array<number> = [];
    users.forEach(user => {
      userIds.push(user.id);
    });
    const randomHastags = [
      'competition',
      'influencer',
      'influencermarketing',
      'fridayfeeling',
      'MondayMotivation',
      'tbt',
      'wcw',
      'thursdaythoughts',
      'traveltuesday',
      'blessed',
      'goals',
      'vegan',
      'fitness',
      'science',
      'fintech',
    ]

    let tweets: any[] = []

    for (let i = 0; i < 200; i++) {
      tweets = [
        ...tweets,
        {
          user_id: faker.random.arrayElement(userIds),
          title: faker.lorem.sentence(),
          content: faker.lorem.sentences(5),
          image_url: faker.random.image(),
          image_width: (Math.random() * 20).toFixed(0),
          image_height: (Math.random() * 20).toFixed(0),
          hashtags: faker.random.arrayElements(randomHastags, 5).toString(),
        },
      ]
    }
    await Tweet.createMany(tweets);
  }
}
