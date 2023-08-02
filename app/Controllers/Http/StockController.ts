import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Stock from "App/Models/Stock";

export default class StockController {

  public async create({ request, response }: HttpContextContract) {
    try {
      const data = request.only([
        "product_name",
        "category",
        "brand",
        "supplier",
        "cost_price",
        "retail_price",
        "quantity",
        "minimum_stock",
        // "maximum_stock",
        // "reorderPoint",
      ]);
      const stock = new Stock();
      stock.fill(data);
      await stock.save();
      return response.created({
        message: "Successfully added",
        data: stock,
      });
    } catch (error) {
      return response.status(500).send({ error: "Failed to create stock" });
    }
  }

  public async getProductNameList({ response }: HttpContextContract) {
    const stockProductName = await Stock.query().select(
      "product_name",
      "product_id",
      "cost_price"
    );
    return response.ok(stockProductName);
  }

  public async index({ response }: HttpContextContract) {
    // const stocks = await Stock.all();
    const stocks = await Stock.query().select(
      "product_id",
      "product_name",
      "category",
      "brand",
      "supplier",
      "cost_price",
      "retail_price",
      "quantity",
      "minimum_stock"
    );
    return response.ok(stocks);
  }

  public async show({ params, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id);
    return response.ok(stock);
  }
  public async getQuanatity({ params, response }: HttpContextContract) {
    const productDetails = await Stock.query()
    .where("product_id", params.id)
    .select("minimum_stock", "quantity","product_name")
    .first();
    return response.ok(productDetails);
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
      "minimum_stock",
      // "maximum_stock",
      // "reorderPoint",
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
