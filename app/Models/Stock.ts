import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Stock extends BaseModel {
  
  @column({ isPrimary: true , columnName:'product_id'})
  public productId: number

  @column({columnName: 'product_name'})
  public productName: string

  @column({columnName: 'category'})
  public category: string

  @column({columnName: 'brand'})
  public brand: string

  @column({columnName: 'supplier'})
  public supplier: string

  @column({columnName: 'cost_price'})
  public costPrice: number

  @column({columnName: 'retail_price'})
  public retailPrice: number

  @column({columnName: 'quantity'})
  public quantity: number

  @column({columnName: 'minimum_stock'})
  public minimumStock: number

  @column({columnName: 'maximum_stock'})
  public maximumStock: number

  @column({columnName: 'reorder_point'})
  public reorderPoint: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
