import { UsersRepository } from "../repositories/UsersRepository"
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

export interface IUserRequest{
    name:string,
    email:string,
    password:string,
    admin?:boolean
}

class CreateUsersService {
    async execute(userRequest: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepository);

        if(!userRequest.admin){
            userRequest.admin = false;
        }

        if(!userRequest.email){
            throw new Error("Email is incorrect!");
        }

        if(!userRequest.password){
            throw new Error("Password is incorrect!");
        }

        const verifyEmailExists = await usersRepository.findOne({email: userRequest.email});

        if(verifyEmailExists){
            throw new Error("Email already exists!");
        }

        userRequest.password = await hash(userRequest.password, 8);
        
        const user = usersRepository.create(userRequest);

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUsersService};