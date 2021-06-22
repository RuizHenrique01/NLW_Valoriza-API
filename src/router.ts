import {Router} from "express";
import { CreateUsersController } from "./controllers/CreateUsersController";

const router = Router();
const createUser = new CreateUsersController();

router.post("/users", createUser.handle);

export {router};
