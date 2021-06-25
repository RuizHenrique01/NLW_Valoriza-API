import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction) {

    const usersRespository = getCustomRepository(UsersRepository);
    
    const { user_id } = request;

    const {admin} = await usersRespository.findOne(user_id);

    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized!"
    });
}