import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export interface IAutenticateUserRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute(autenticateUserRequest: IAutenticateUserRequest) {
        const userRepository = getCustomRepository(UsersRepository);

        const verifyUserExists = await userRepository
            .findOne({ email: autenticateUserRequest.email });

        if (!verifyUserExists) {
            throw new Error("Email/Password incorrect!");
        }

        const passwordMatches = await compare(
            autenticateUserRequest.password,
            verifyUserExists.password
        );

        if (!passwordMatches) {
            throw new Error("Email/Password incorrect!");
        }

        const token = sign(
            {email: verifyUserExists.email},
            "e12c0d6c76b08bc6a26e8dd167a4f485",
            {
                subject: verifyUserExists.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService };