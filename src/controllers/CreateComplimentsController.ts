import { Request, Response} from "express";
import { CreateComplimentsService, IComplimentRequest } from "../services/CreateComplimentsService";

class CreateComplimentsController{
    async handle(request: Request, response: Response){
        const complimentRequest: IComplimentRequest = request.body;
        const { user_id } = request;

        complimentRequest.user_sender = user_id;

        const createComplimentsService = new CreateComplimentsService();

        const compliment = await createComplimentsService.execute(
            complimentRequest
        );

        return response.json(compliment);
    }
}

export { CreateComplimentsController };