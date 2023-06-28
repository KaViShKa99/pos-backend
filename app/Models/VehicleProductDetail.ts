import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class VehicleProductDetail extends BaseModel {

  @column({ isPrimary: true ,columnName: "vehicle_product_id"})
  public vehicleProductId: number

  @column({ columnName: "vehicle_number" })
  public vehicleNumber: string;

  @column({ columnName: "product_id" })
  public productId: number;
  
  @column({ columnName: "product_name" })
  public productName: string;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
