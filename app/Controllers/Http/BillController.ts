import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bill from "App/Models/Bill";

export default class BillsController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(["customer_name", "total_amount", "payment_method"]);
   
    const bill = new Bill();
    bill.customerName = data.customer_name;
    bill.totalAmount = data.total_amount;
    bill.paymentMethod = data.payment_method;
    
    await bill.save();
    // return response.created(bill);
    return response.created({
      data: {
        invoice_id:bill.invoiceId,
        display_id: bill.displayId,
        customer_name: bill.customerName,
        total_amount: bill.totalAmount,
        created_at: bill.createdAt,
        payment_method: bill.paymentMethod,
      },
      message: 'Bill created successfully',
    });
  }

  public async index({ response }: HttpContextContract) {
    // const bills = await Bill.all();
    const bills = await Bill.query().select('invoice_id','display_id','customer_name','total_amount', 'payment_method','created_at')
    return response.ok(bills);
  }

  public async show({ params, response }: HttpContextContract) {
    const bill = await Bill.findOrFail(params.id);
    return response.ok(bill);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const bill = await Bill.findOrFail(params.id);
    const data = request.only(["customerName", "paymentMethod"]);
    bill.merge(data);
    await bill.save();
    return response.created({
      data: {
        invoice_id:bill.invoiceId,
        display_id: bill.displayId,
        customer_name: bill.customerName,
        total_amount: bill.totalAmount,
        created_at: bill.createdAt,
        payment_method: bill.paymentMethod,
      },
      message: 'Bill updated successfully',
    });
    // return response.ok(bill);
  }

  public async delete({ params, response }: HttpContextContract) {
    const bill = await Bill.findOrFail(params.id);
    await bill.delete();
    return response.noContent();
  }
}
