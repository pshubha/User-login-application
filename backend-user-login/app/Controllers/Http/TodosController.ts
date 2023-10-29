import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
    public async index(){
        return Todo.all()
    }

    public async store({request,response}:HttpContextContract){
        Todo.create({
          name:request.input('name'),
          email:request.input('email'),
          password:request.input('password'),
          status:"active"
        })
        console.log(response)
        return response.status(201).json({'created ':true})
    }

    public async update({request, response, params}:HttpContextContract){
        const todo = await Todo.findOrFail(params.id)
        todo.name = request.input('name')
        todo.email = request.input('email')
        todo.password = request.input('password')
        todo.status = request.input('status')
        todo.save()
        return response.status(202).json(todo)
    }

    public async destroy({response, params}:HttpContextContract){
      const todo = await Todo.find(params.id)
      await todo?.delete()
      return response.status(204).json({'deleted':true})
    }
}
