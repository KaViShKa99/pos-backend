import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  @column({ isPrimary: true, columnName: "user_id" })
  public userId: number;

  @column({ columnName: "user_name" })
  public userName: string;

  @column({ columnName: "password" })
  public password: string;

  @column({ columnName: "first_name" })
  public firstName: string;

  @column({ columnName: "last_name" })
  public lastName: string;

  @column({ columnName: "role" })
  public role: string;

  @column({ columnName: "active" })
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
