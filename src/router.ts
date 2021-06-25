import {Router} from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAutenticated } from "./middlewares/ensureAuthenticated";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { CreateTagsController } from "./controllers/CreateTagsController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();
const createUser = new CreateUsersController();
const createTag = new CreateTagsController();
const authenticateUser = new AuthenticateUserController();
const createCompliment = new CreateComplimentsController();
const listUserSender = new ListUserSenderComplimentsController();
const listUserReceiver = new ListUserReceiverComplimentsController();
const listTags = new ListTagsController();
const listUsers = new ListUsersController();

router.post("/users", createUser.handle);
router.get("/users", ensureAutenticated, listUsers.handle);

router.post("/tags", ensureAutenticated, ensureAdmin, createTag.handle);
router.get("/tags", ensureAutenticated, listTags.handle);

router.post("/login", authenticateUser.handle);
router.post("/compliments", ensureAutenticated, createCompliment.handle);

router.get("/users/compliments/sends", ensureAutenticated, listUserSender.handle);
router.get("/users/compliments/receives", ensureAutenticated, listUserReceiver.handle);


export { router };
