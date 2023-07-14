import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UserController {
  public async create({ request, response }: HttpContextContract) {
    
    try{
      const data = request.only([
        "user_name",
        "password",
        // "firstName",
        // "lastName",
        // "role",
        // "active",
      ]);
      const user = new User();
      user.fill(data);
      await user.save();
      return response.created({
        message: "Successfully added",
        data: user,
        status:"success"
      });

    }catch(error){
      return response.status(500).json({ message: "error",status:"error" });
    }
  }

  public async index({ response }: HttpContextContract) {
    // const users = await User.all();
    // return response.ok(users);
    try {
      const userDetails = await User.query().select(
        "user_id ",
        "user_name",
        "password"
      );

      return response.status(200).json(userDetails);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    return response.ok(user);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    const data = request.only([
      "user_name",
      "password",
      // "firstName",
      // "lastName",
      // "role",
      // "active",
    ]);
    user.merge(data);
    await user.save();
    return response.ok(user);
  }

  public async delete({ params, response }: HttpContextContract) {
  
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      return response.status(204);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
