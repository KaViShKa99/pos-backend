import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class VehicleDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'vehicle_number'})
  public vehicleNumber: string

  @column({columnName: 'items'})
  public items: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
