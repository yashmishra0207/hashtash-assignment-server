import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';
import * as faker from 'faker';

export default class UserSeeder extends BaseSeeder {

  public static developmentOnly = true
  
  public async run () {
    // Write your database queries inside the run method

    let users: any[] = [];

    users = [
      {
        full_name: "Yash Mishra",
        email: "yashmishra0207@gmail.com",
        handle: "live_moments",
        phone: 6306556234,
        password: 'test1234',
        about: 'Technology Enthusiast. ' + faker.lorem.words(10),
        profile_pic: 'https://avatars.githubusercontent.com/u/67147761?v=4',
        location: 'Lakhimpur-kheri, Uttar Pradesh, India'
      },
    ]

    for (let i = 0; i < 9; i++) {
      users = [
        ...users,
        {
          full_name: faker.name.findName(),
          email: faker.internet.email(),
          handle: faker.internet.userName(),
          phone: faker.phone.phoneNumber(),
          password: 'test1234',
          about: faker.lorem.words(),
          profile_pic: faker.image.imageUrl(150, 150, 'people', true, true),
          location: faker.address.city(),
        },
      ]
    }

    await User.createMany(users);
  }
}