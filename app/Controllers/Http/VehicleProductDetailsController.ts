import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleProductDetails from 'App/Models/VehicleProductDetail';
import Database from "@ioc:Adonis/Lucid/Database";

export default class VehicleProductDetailsController {
    public async index({ response }: HttpContextContract) {
        try {
          const vehicleProductDetails = await VehicleProductDetails.query().select(
            'vehicle_product_id',
            'vehicle_number',
            'product_id',
            'product_name'
          );
    
          return response.status(200).json(vehicleProductDetails);
        } catch (error) {
          return response.status(500).json({ error: 'Internal server error' });
        }
      }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const vehicleProductDetails = await VehicleProductDetails.query()
            .where('vehicle_number', params.id)
         
    
          if (vehicleProductDetails) {
            return response.status(200).json(vehicleProductDetails);
          } else {
            return response.status(404).json({ error: 'Vehicle product details not found' });
          }
        } catch (error) {
          return response.status(500).json({ error: 'Internal server error' });
        }
      }
    
      public async create({ request, response }: HttpContextContract) {
        try {
          const data = request.only([
            'vehicleNumber',
            'product_id',
            'product_name',
            'quantity'
          ]);
    

          const vehicleProductDetails = new VehicleProductDetails();
          vehicleProductDetails.fill(data);
          await vehicleProductDetails.save();
          return response.created({
            message: "Successfully added",
            data: vehicleProductDetails,
          });
    
        } catch (error) {
          return response.status(500).json({ error: 'Internal server error' });
        }
      }
      public async getAllVehicleNumberList({ response }: HttpContextContract) {
        const invoiceIds = await Database.from('vehicle_product_details').distinct('vehicle_number');
        return response.ok(invoiceIds);
      }
    
      public async update({ params, request, response }: HttpContextContract) {
        try {
          const { vehicle_number, product_id, product_name } = request.only([
            'vehicle_number',
            'product_id',
            'product_name',
          ]);
    
          const vehicleProductDetails = await VehicleProductDetails.findOrFail(params.id);
          vehicleProductDetails.merge({
            vehicleNumber: vehicle_number,
            productId: product_id,
            productName: product_name,
          });
          await vehicleProductDetails.save();
    
          return response.status(200).json(vehicleProductDetails);
        } catch (error) {
          return response.status(500).json({ error: 'Internal server error' });
        }
      }
    
      public async delete({ params, response }: HttpContextContract) {
        try {
          const vehicleProductDetails = await VehicleProductDetails.findOrFail(params.id);
          await vehicleProductDetails.delete();
    
          return response.status(204);
        } catch (error) {
          return response.status(500).json({ error: 'Internal server error' });
        }
      }
}
