import { DateTime } from "luxon";
import { BaseModel, column, } from "@ioc:Adonis/Lucid/Orm";


export default class ProductDetail extends BaseModel {

  @column({ isPrimary: true, columnName: "product_details_id" })
  public productDetailsId: number;

  @column({ columnName: "invoice_id" })
  public invoiceId: string;

  @column({ columnName: "product_id" })
  public productId: number;
  
  @column({ columnName: "product_name" })
  public productName: string;

  @column({ columnName: "quantity" })
  public quantity: number;

  @column({ columnName: "unit_price" })
  public unitPrice: number;

  @column({ columnName: "subtotal" })
  public subtotal: number;

  @column({ columnName: "discount" })
  public discount: number;
  
  @column({ columnName: "total" })
  public total: number;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
