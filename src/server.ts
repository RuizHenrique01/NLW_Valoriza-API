import express from "express";
import "reflect-metadata";
import "express-async-errors"

import "./database";
import "./router";
import { router } from "./router";

const app = express();

app.use(express.json());

app.use(router);

app.use(
    (err, request: express.Request, response: express.Response, next: express.NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
       status: "Error!",
       message: "Internal Server error"
    });
});

app.listen(3000, () => console.log("Server is running in port 3000"));