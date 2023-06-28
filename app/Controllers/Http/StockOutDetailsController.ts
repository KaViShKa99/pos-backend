import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/StockOutDetail";
import Stock from "App/Models/Stock";

export default class StockOutDetailsController {
  public async index({ response }: HttpContextContract) {
    const products = await Product.all();
    return response.ok(products);
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const productData = request.only([
        "product_id",
        "product_name",
        "quantity",
      ]);
      const product = await Product.create(productData);
      return response.created({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      return response.badRequest({
        message: "Error creating product",
        error: error.message,
      });
    }
  }
  public async show({ params, response }: HttpContextContract) {
    const productId = params.id;
    const product = await Product.query().where("product_id", productId);
    return response.ok(product[0]);
  }
  public async addQuantity({ params, request, response }: HttpContextContract) {
    try {
      const productId = params.id;
      const productData = request.only(["product_name", "quantity"]);

      const product = await Product.findByOrFail("product_id", productId);

      const stockQuantity = await Stock.query()
      .where("product_id", productId)
      .select("quantity")
      .first();

      if(stockQuantity && stockQuantity.quantity >=productData.quantity){

        const updatedProduct ={
          ...product,
          quantity:product.quantity+parseInt(productData.quantity, 10)
        }
        product.merge(updatedProduct);
        await product.save();
      }


      return response.ok(product);
    } catch (error) {
      return response.badRequest({
        message: "Error updating product",
        error: error.message,
      });
    }
  }
  public async reduceQuantity({ params, request, response }: HttpContextContract) {
    try {
      const productId = params.id;
      const productData = request.only(["product_name", "quantity"]);

      const product = await Product.findByOrFail("product_id", productId);

      

      const updatedProduct ={
        ...product,
        quantity:product.quantity-parseInt(productData.quantity, 10)
      }
      product.merge(updatedProduct);
      await product.save();

      return response.ok(product);
    } catch (error) {
      return response.badRequest({
        message: "Error updating product",
        error: error.message,
      });
    }
  }
  public async delete({ params, response }: HttpContextContract) {
    const productId = params.id;
    const product = await Product.findBy("product_id", productId);

    if (!product) {
      return response.notFound({ message: "Product not found" });
    }

    await product.delete();
    return response.noContent();
  }
}
