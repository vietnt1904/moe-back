import express from "express";
import { login, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/select",);

authRouter.post("/login", login);
authRouter.post("/signup", signup);


export default authRouter;
