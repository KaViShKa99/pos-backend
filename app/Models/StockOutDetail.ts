import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StockOutDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName:'product_id'})
  public productId: number

  @column({columnName: 'product_name'})
  public productName: string

  @column({columnName: 'quantity'})
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
