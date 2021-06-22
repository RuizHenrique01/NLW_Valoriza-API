import express from "express";
import "reflect-metadata";

import "./database";
import "./router";
import { router } from "./router";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3000, () => console.log("Server is running in port 3000"));