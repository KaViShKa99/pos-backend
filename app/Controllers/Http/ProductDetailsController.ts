import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BillItem from "App/Models/ProductDetail";

export default class ProductDetailsController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only([
      "productId",
      "productName",
      "quantity",
      "totalAmount",
      "subtotal",
      "discount",
      "invoiceId",
      "stockProductId",
    ]);
    const billItem = new BillItem();
    billItem.fill(data);
    await billItem.save();
    return response.created(billItem);
  }

  public async index({ response }: HttpContextContract) {
    const billItems = await BillItem.all();
    return response.ok(billItems);
  }

  public async show({ params, response }: HttpContextContract) {
    const billItem = await BillItem.findOrFail(params.id);
    return response.ok(billItem);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const billItem = await BillItem.findOrFail(params.id);
    const data = request.only([
      "productId",
      "productName",
      "quantity",
      "totalAmount",
      "subtotal",
      "discount",
      "invoiceId",
      "stockProductId",
    ]);
    billItem.merge(data);
    await billItem.save();
    return response.ok(billItem);
  }

  public async delete({ params, response }: HttpContextContract) {
    const billItem = await BillItem.findOrFail(params.id);
    await billItem.delete();
    return response.noContent();
  }
}
