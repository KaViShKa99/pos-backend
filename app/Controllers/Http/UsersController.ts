import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only([
      "userName",
      "password",
      "firstName",
      "lastName",
      "role",
      "active",
    ]);
    const user = new User();
    user.fill(data);
    await user.save();
    return response.created(user);
  }

  public async index({ response }: HttpContextContract) {
    const users = await User.all();
    return response.ok(users);
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    return response.ok(user);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    const data = request.only([
      "userName",
      "password",
      "firstName",
      "lastName",
      "role",
      "active",
    ]);
    user.merge(data);
    await user.save();
    return response.ok(user);
  }

  public async delete({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return response.noContent();
  }
}
