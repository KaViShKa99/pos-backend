import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('user_id').primary();
      table.string('user_name',50).notNullable().unique();
      table.string('password',180).notNullable();
      table.string('first_name',180);
      table.string('last_name',180);
      table.string('role',80);
      table.boolean('active');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
