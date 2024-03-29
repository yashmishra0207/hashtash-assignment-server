import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tweets extends BaseSchema {
  protected tableName = 'tweets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('content').nullable()
      table.string('image_url').nullable()
      table.string('image_width').nullable()
      table.string('image_height').nullable()
      table.text('hashtags').nullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
