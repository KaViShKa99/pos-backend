import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VehicleDetails from "App/Models/VehicleDetail";

export default class VehicleDetailsController {
  public async index({ response }: HttpContextContract) {
    try {
      const vehicleDetails = await VehicleDetails.query().select(
        "id",
        "vehicle_number",
        "items"
      );

      return response.status(200).json(vehicleDetails);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const vehicleDetails = await VehicleDetails.query()
        .where("id", params.id)
        .select("id", "vehicle_number", "items")
        .first();

      if (vehicleDetails) {
        return response.status(200).json(vehicleDetails);
      } else {
        return response
          .status(404)
          .json({ error: "Vehicle details not found" });
      }
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const data = request.only(["vehicle_number", "items"]);

      const vehicleDetails = new VehicleDetails();
      vehicleDetails.fill(data);
      await vehicleDetails.save();
      return response.created({
        message: "Successfully added",
        data: vehicleDetails,
      });

    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
  public async addItem({ params,  response }: HttpContextContract) {
    try {
      const vehicleNumber = params.id;

      const vehicleDetails = await VehicleDetails.findByOrFail("vehicle_number", vehicleNumber);
      const updatedItem ={
        ...vehicleDetails,
        items:vehicleDetails.items + 1
      }

      vehicleDetails.merge(updatedItem);
      await vehicleDetails.save();

      return response.ok(vehicleDetails);
    } catch (error) {
      return response.badRequest({
        message: "Error updating item",
        error: error.message,
      });
    }
  }
  public async reduceItem({ params, response }: HttpContextContract) {
    try {
      const vehicleNumber = params.id;

      const vehicleDetails = await VehicleDetails.findByOrFail("vehicle_number", vehicleNumber);
      
      const updatedItem ={
        ...vehicleDetails,
        items:vehicleDetails.items-1
      }

      vehicleDetails.merge(updatedItem);
      await vehicleDetails.save();

      return response.ok(vehicleDetails);
    } catch (error) {
      return response.badRequest({
        message: "Error updating product",
        error: error.message,
      });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const { vehicleNumber, items } = request.only(["vehicleNumber", "items"]);

      const vehicleDetails = await VehicleDetails.findOrFail(params.id);
      vehicleDetails.merge({
        vehicleNumber,
        items,
      });
      await vehicleDetails.save();

      return response.status(200).json(vehicleDetails);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const vehicleDetails = await VehicleDetails.findOrFail(params.id);
      await vehicleDetails.delete();

      return response.status(204);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
