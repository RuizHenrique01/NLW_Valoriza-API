import { Request, Response} from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController{
    async handle(request: Request, response: Response){
        const listUsersSevice = new ListUsersService();

        const users = await listUsersSevice.execute();

        return response.json(users);
    }
}

export { ListUsersController };