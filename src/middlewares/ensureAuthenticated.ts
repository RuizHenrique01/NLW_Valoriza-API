import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAutenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const token = authToken.split(" ")[1];

    try {
        const {sub} = verify(token, "e12c0d6c76b08bc6a26e8dd167a4f485") as IPayload;

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}