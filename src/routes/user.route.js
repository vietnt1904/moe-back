import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserInformation,
} from "../controllers/user.controller.js";
import { uploadAvatarAndBackground } from "../middlewares/upload_image.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.patch("/:id", uploadAvatarAndBackground, updateUserInformation);
userRouter.get("/", getAllUsers);

export default userRouter;
