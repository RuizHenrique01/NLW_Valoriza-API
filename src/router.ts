import {Router} from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { CreateTagsController } from "./controllers/CreateTagsController";

const router = Router();
const createUser = new CreateUsersController();
const createTag = new CreateTagsController();

router.post("/users", createUser.handle);
router.post("/tags", ensureAdmin, createTag.handle);

export {router};
