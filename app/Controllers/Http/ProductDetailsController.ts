import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BillItem from "App/Models/ProductDetail";
import Database from "@ioc:Adonis/Lucid/Database";
import Ws from "App/Services/Ws";
import Stock from "App/Models/Stock";
import StockOut from "App/Models/StockOutDetail";

export default class ProductDetailsController {
  
  public async create({ request, response }: HttpContextContract) {
    const data = request.only([
      "invoice_id",
      "product_id",
      "product_name",
      "quantity",
      "unit_price",
      "total",
      "subtotal",
      "discount",
    ]);

    const billItem = new BillItem();
    billItem.fill(data);

    const productDetails = await Stock.query()
      .where("product_id", billItem.productId)
      .select("minimum_stock", "quantity","product_name")
      .first();

    const stockOutQuantity = await StockOut.query()
      .where("product_id", billItem.productId)
      .select("quantity")
      .first();

    if (productDetails && stockOutQuantity) {
      const realQuantity = productDetails.quantity ;
      const editedQuantity = billItem.quantity ;
      const quantity = productDetails.quantity - stockOutQuantity.quantity;
      const minimum_stock = productDetails.minimumStock;

      if (minimum_stock >= quantity && realQuantity >= editedQuantity ) {
        Ws.io.emit("reachMinimum", `${productDetails.productName} has reached the minimum stock level. Current quantity: ${quantity}`);
      }
    }

    let savedData = {};
    if (productDetails && productDetails.quantity >= billItem.quantity) {
      await billItem.save();

      savedData = {
        data: {
          product_details_id: billItem.productDetailsId,
          invoice_id: billItem.invoiceId,
          product_id: billItem.productId,
          product_name: billItem.productName,
          quantity: billItem.quantity,
          subtotal: billItem.subtotal,
          total: billItem.total,
          unit_price: billItem.unitPrice,
          discount: billItem.discount,
        },
        message: "Product details created successfully",
        status: "success",
      };
    } else {
      savedData = {
        data: {},
        message: `product quantity should be less than ${productDetails?.quantity} `,
        status: "error",
      };
    }

    return response.created(savedData);
  }

  public async index({ response }: HttpContextContract) {
    const billItems = await BillItem.all();
    return response.ok(billItems);
  }

  public async getAllInvoiceId({ response }: HttpContextContract) {
    const invoiceIds = await Database.from("product_details").distinct(
      "invoice_id"
    );
    return response.ok(invoiceIds);
  }

  public async show({ params, response }: HttpContextContract) {
    // const billItem = await BillItem.findOrFail(params.id);
    const billItems = await BillItem.query().where("invoice_id", params.id);
    return response.ok(billItems);
  }
  public async getProductQuantity({ params, response }: HttpContextContract) {
    // const billItem = await BillItem.findOrFail(params.id);
    let productTotalQuantity = 0

    const totalQuantities  = await BillItem.query()
    // .select("quantity")
    // .where("product_id", params.id)
    // .groupBy("product_id")
    // .sum("quantity as totalQuantity");
    .select(Database.raw('SUM(quantity) as totalQuantity'))
    .where('product_id', params.id)
    .groupBy('product_id');

  
    // const productTotalQuantity = totalQuantities[0] || 0;   
    if(!!totalQuantities[0]){

      productTotalQuantity = totalQuantities[0].$extras.totalQuantity || 0;
    }
    // const tQuantity = totalQuantities[0]['totalQuantity'] || 0; 
    
    
    
    return response.ok(productTotalQuantity);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const billItem = await BillItem.findOrFail(params.id);
    const data = request.only([
      "product_id",
      "product_name",
      "quantity",
      "total",
      "subtotal",
      "discount",
      "unit_price",
      // "invoiceId",
      // "product_details_id",
    ]);
    billItem.merge(data);

    const productDetails = await Stock.query()
      .where("product_id", billItem.productId)
      .select("minimum_stock", "quantity","product_name")
      .first();

    const stockOutQuantity = await StockOut.query()
      .where("product_id", billItem.productId)
      .select("quantity")
      .first();

    if (productDetails && stockOutQuantity) {
      const realQuantity = productDetails.quantity ;
      const editedQuantity = billItem.quantity ;
      const quantity = productDetails.quantity - stockOutQuantity.quantity;
      const minimum_stock = productDetails.minimumStock;

      if (minimum_stock >= quantity && realQuantity >= editedQuantity) {
        Ws.io.emit("reachMinimum", `${productDetails.productName} has reached the minimum stock level. Current quantity: ${quantity}`);
      }
    }

    let savedData = {};
    if (productDetails && productDetails.quantity >= billItem.quantity) {
      await billItem.save();

      savedData = {
        message: "Product details update successfully",
        status: "success",
      };
    } else {
      savedData = {
        message: `product quantity should be less than ${productDetails?.quantity} `,
        status: "error",
      };
    }

    // await billItem.save();
    return response.ok(savedData);
  }

  public async delete({ params, response }: HttpContextContract) {
    const billItem = await BillItem.findOrFail(params.id);
    await billItem.delete();
    return response.noContent();
  }
}
