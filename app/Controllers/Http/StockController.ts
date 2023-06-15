import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Stock from "App/Models/Stock";

export default class StockController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only([
      "productName",
      "category",
      "brand",
      "supplier",
      "costPrice",
      "retailPrice",
      "quantity",
      "minimumStock",
      "maximumStock",
      "reorderPoint",
    ]);
    const stock = new Stock();
    stock.fill(data);
    await stock.save();
    return response.created(stock);
  }

  public async index({ response }: HttpContextContract) {
    const stocks = await Stock.all();
    return response.ok(stocks);
  }

  public async show({ params, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id);
    return response.ok(stock);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id);
    const data = request.only([
      "productName",
      "category",
      "brand",
      "supplier",
      "costPrice",
      "retailPrice",
      "quantity",
      "minimumStock",
      "maximumStock",
      "reorderPoint",
    ]);
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
