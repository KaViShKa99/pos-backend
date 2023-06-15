import { DateTime } from 'luxon'
import { BaseModel, column,BelongsTo,belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Bill from './Bill';
import Stock from './Stock';

export default class ProductDetail extends BaseModel {


  @column({ isPrimary: true, columnName: 'product_details_id' })
  public productId: number

  @column({ columnName: 'product_name' })
  public productName: string

  @column({ columnName: 'quantity' })
  public quantity: number

  @column({ columnName: 'total_amount' })
  public totalAmount: number

  @column({ columnName: 'subtotal' })
  public subtotal: number

  @column({ columnName: 'discount' })
  public discount: number

  @column({ columnName: 'invoice_id' })
  public invoiceId: string;

  @column({ columnName: 'product_id' })
  public stockProductId: number;

  @belongsTo(() => Bill, {
    foreignKey: 'invoiceId',
  })
  public bill: BelongsTo<typeof Bill>;

  @belongsTo(() => Stock, {
    foreignKey: 'stockProductId',
  })
  public stock: BelongsTo<typeof Stock>;
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
