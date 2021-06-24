import { AuthenticateUserService } from "../services/AuthenticateUserService";
import {Request, Response } from "express";

class AuthenticateUserController {
    async handle(request: Request, response: Response){
        const userAuthenticate = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute(
            userAuthenticate
        );

        return response.json(token);
    }
}

export { AuthenticateUserController };