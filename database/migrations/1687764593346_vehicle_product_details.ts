import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_product_details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('vehicle_product_id').primary();
      table.string('vehicle_number',20).references('vehicle_details.vehicle_number').onDelete('CASCADE');
      table.integer('product_id').unsigned().references('stocks.product_id');
      table.string('product_name',256).notNullable();
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
