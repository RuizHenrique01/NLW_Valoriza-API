import {Router} from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { CreateTagsController } from "./controllers/CreateTagsController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";

const router = Router();
const createUser = new CreateUsersController();
const createTag = new CreateTagsController();
const authenticateUser = new AuthenticateUserController();
const createCompliment = new CreateComplimentsController();

router.post("/users", createUser.handle);
router.post("/tags", ensureAdmin, createTag.handle);
router.post("/login", authenticateUser.handle);
router.post("/compliments", createCompliment.handle);

export { router };
