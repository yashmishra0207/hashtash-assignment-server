import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fullName: string;

  @column()
  public email: string;

  @column()
  public handle: string;

  @column()
  public phone: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public about: string;

  @column()
  public profilePic: string;

  @column()
  public location: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.password && user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
