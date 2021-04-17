/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'


Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.post('/login', 'AuthController.login');
Route.post('/signup', 'AuthController.signup');

Route.group(() => {
  Route.group(() => {
    Route.get('/me', 'UsersController.me');
    Route.get('/show/:id', 'UsersController.show');
    Route.get('/search', 'UsersController.search');
    Route.post('/follow', 'UsersController.follow');
    Route.post('/unfollow', 'UsersController.unFollow');
    Route.get('/followers', 'UsersController.followers');
    Route.get('/following', 'UsersController.followings');
  }).prefix('user')

  Route.group(() => {
    Route.post('/', 'TweetsController.create');
    Route.get('/', 'TweetsController.myTweets');
    Route.get('/search', 'TweetsController.search');
  }).prefix('tweet')

  Route.group(() => {
    Route.get('/', 'TweetsController.list');
  }).prefix('feed')
}).middleware('auth')
