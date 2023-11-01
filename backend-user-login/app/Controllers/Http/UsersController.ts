import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class UsersController {
    public async index(){
        return User.all()
    }

    public async store({request,response}:HttpContextContract){
        User.create({
          name:request.input('name'),
          email:request.input('email'),
          password:request.input('password'),
          status:"active"
        })
        console.log(response)
        return response.status(201).json({'created ':true})
    }

    public async update({request, response, params}:HttpContextContract){
        const user = await User.findOrFail(params.id)
        user.name = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        user.status = request.input('status')
        user.save()
        return response.status(202).json(user)
    }

    public async destroy({response, params}:HttpContextContract){
      const user = await User.find(params.id)
      await user?.delete()
      return response.status(204).json({'deleted':true})
    }
}
