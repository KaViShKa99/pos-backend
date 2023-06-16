import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bills'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.string('invoice_id',20).primary()
      table.string('display_id',20).notNullable()
      table.string('customer_name').notNullable()
      table.float('total_amount')
      // table.float('total_amount').notNullable()
      table.string('payment_method').notNullable()
      
      
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
