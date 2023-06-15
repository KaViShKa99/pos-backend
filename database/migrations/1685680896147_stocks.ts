import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('product_id').primary();
      table.string('product_name', 256).notNullable();
      table.string('category', 256)
      table.string('brand', 256)
      table.string('supplier', 256)
      // table.string('category', 256).notNullable();
      // table.string('brand', 256).notNullable();
      // table.string('supplier', 256).notNullable();
      table.decimal('cost_price', 19, 2).notNullable();
      table.decimal('retail_price', 19, 2).notNullable();
      table.integer('quantity').notNullable();
      table.integer('minimum_stock')
      table.integer('maximum_stock').notNullable();
      table.integer('reorder_point')

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
