import { TagsRepository } from "../repositories/TagsRepository";
import { getCustomRepository } from "typeorm";
import { response } from "express";

class CreateTagsService {

    async excute(name: string){
        const tagsRepository = getCustomRepository(TagsRepository);

        if(!name){
            throw new Error("Incorrect name!");
        }

        const verifyNameExists = await tagsRepository.findOne({name: name});

        if(verifyNameExists){
            throw new Error("Tag already exists!");
        }

        const tag = tagsRepository.create({name});

        await tagsRepository.save(tag);

        return tag;
    }
}

export { CreateTagsService };