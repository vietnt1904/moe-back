import express from "express";
import { forgetPassword, login, resetPassword, signup, signupdata, verifyOTP } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/select",);

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/signupdata", signupdata);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);


export default authRouter;
