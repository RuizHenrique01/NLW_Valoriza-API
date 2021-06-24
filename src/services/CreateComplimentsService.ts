import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

export interface IComplimentRequest{
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentsService{

    async execute(complimentRequest: IComplimentRequest){
        const complimentsRepository = getCustomRepository(ComplimentsRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        if(complimentRequest.user_sender === complimentRequest.user_receiver){
            throw new Error("Incorrect user receiver!");
        }

        const verifyUserReceiver = await usersRepository.findOne(
            complimentRequest.user_receiver
        );

        if(!verifyUserReceiver){
            throw new Error("User receiver does not exists!"); 
        }

        const compliment = complimentsRepository.create(complimentRequest);

        await complimentsRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentsService };