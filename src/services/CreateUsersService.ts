import { UsersRepository } from "../repositories/UsersRepository"
import { getCustomRepository } from "typeorm";

export interface IUserRequest{
    name:string,
    email:string,
    admin?:boolean
}

class CreateUsersService {
    async execute(userRequest: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepository);

        if(!userRequest.email){
            throw new Error("Email is incorrect!");
        }

        const verifyEmailExists = await usersRepository.findOne({email: userRequest.email});

        if(verifyEmailExists){
            throw new Error("Email already exists!");
        }

        const user = usersRepository.create(userRequest);

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUsersService};