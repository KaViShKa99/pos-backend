import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bills'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table.increments('bill_id').primary();
      table.integer('customer_name').notNullable();
      table.integer('product_id').unsigned().references('stocks.product_id');
      table.string('product_name',256).notNullable();
      table.integer('quantity').notNullable();
      table.decimal('unit_price', 19, 2).notNullable();
      table.decimal('subtotal', 19, 2).notNullable();
      table.decimal('discount').notNullable();
      table.decimal('total', 19, 2).notNullable();
      table.string('payment_method').notNullable();

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
