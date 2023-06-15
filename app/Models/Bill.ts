import { DateTime } from "luxon";
import { BaseModel,beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4 } from 'uuid';

export default class Bill extends BaseModel {

  
  @column({ isPrimary: true, columnName: "invoice_id" })
  public invoiceId: string;

  @column({ columnName: "customer_name" })
  public customerName: string;

  @column.dateTime({ autoCreate: true,columnName:"created_at" })
  public createdAt: DateTime;

  @column({ columnName: "total_amount" })
  public totalAmount: number;

  @column({ columnName: "payment_method" })
  public paymentMethod: string;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static generateInvoiceId(bill: Bill) {
    bill.invoiceId = uuidv4();
  }
}
