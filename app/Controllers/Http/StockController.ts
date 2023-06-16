import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Stock from "App/Models/Stock";

export default class StockController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only([
      "product_name",
      "category",
      "brand",
      "supplier",
      "cost_price",
      "retail_price",
      "quantity",
      // "minimumStock",
      "maximum_stock",
      // "reorderPoint",
    ]);
    const stock = new Stock();
    stock.fill(data);
    await stock.save();
    return response.created(stock);
  }

  public async index({ response }: HttpContextContract) {
    // const stocks = await Stock.all();
    const stocks = await Stock.query().select('product_id','product_name', 'category', 'brand', 'supplier', 'cost_price', 'retail_price', 'quantity', 'maximum_stock')
    return response.ok(stocks);
  }

  public async show({ params, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id);
    return response.ok(stock);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id);
    const data = request.only([
      "product_name",
      "category",
      "brand",
      "supplier",
      "cost_price",
      "retail_price",
      "quantity",
      // "minimumStock",
      "maximum_stock",
      // "reorderPoint",
    ]);
    console.log('aaaaa ',data,params.id);
    stock.merge(data);
    await stock.save();
    return response.ok(stock);
  }

  public async delete({ params, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id);
    await stock.delete();
    return response.noContent();
  }
}
