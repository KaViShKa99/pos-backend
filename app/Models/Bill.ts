import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bill extends BaseModel {
  
  @column({ isPrimary: true , columnName:'bill_id'})
  public billId: number

  @column({columnName: 'customer_name'})
  public customerName: number

  @column({columnName: 'product_id'})
  public productId: number

  @column({columnName: 'product_name'})
  public productName: string

  @column({columnName: 'quantity'})
  public quantity: number

  @column({columnName: 'unit_price'})
  public unitPrice: number

  @column({columnName: 'subtotal'})
  public subtotal: number

  @column({columnName: 'discount'})
  public discount: number

  @column({columnName: 'total'})
  public total: number

  @column({columnName: 'payment_method'})
  public paymentMethod: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
