import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('phone', 255).nullable()
      table.string('location', 255).nullable()
      table.string('profile_pic', 255).nullable()
      table.string('about').nullable()
      table.string('password', 180).notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
