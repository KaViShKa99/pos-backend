import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bill from "App/Models/Bill";

export default class BillsController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(["customerName", "totalAmount", "paymentMethod"]);
   
    const bill = new Bill();
    bill.customerName = data.customerName;
    bill.totalAmount = data.totalAmount;
    bill.paymentMethod = data.paymentMethod;
    
    await bill.save();
    return response.created(bill);
  }

  public async index({ response }: HttpContextContract) {
    const bills = await Bill.all();
    return response.ok(bills);
  }

  public async show({ params, response }: HttpContextContract) {
    const bill = await Bill.findOrFail(params.id);
    return response.ok(bill);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const bill = await Bill.findOrFail(params.id);
    const data = request.only(["customerName", "totalAmount", "paymentMethod"]);
    bill.merge(data);
    await bill.save();
    return response.ok(bill);
  }

  public async delete({ params, response }: HttpContextContract) {
    const bill = await Bill.findOrFail(params.id);
    await bill.delete();
    return response.noContent();
  }
}
