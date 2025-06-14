import express from "express";
import { adminLogin, adminSignup, getSession } from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.js";

const adminAuthRouter = express.Router();

adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.post("/signup", adminSignup);
adminAuthRouter.get("/session", verifyToken, getSession)


export default adminAuthRouter;
