import { Request, Response } from "express";
import {CreateUsersService} from "../services/CreateUsersService";
import {IUserRequest} from "../services/CreateUsersService";

class CreateUsersController{
    async handle(request : Request, response : Response){
        const userRequest : IUserRequest = request.body;

        const createUsersService = new CreateUsersService();

        const user = await createUsersService.execute(userRequest);

        return response.json(user);
    }
}

export {CreateUsersController};