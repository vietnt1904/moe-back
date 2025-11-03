import express from "express";
import {
  addStoryToHistory,
  changePassword,
  checkSaved,
  checkUserPaidStory,
  getAllNotifications,
  getAllUsers,
  getHistoryByUserId,
  getSavedStoryByUserId,
  getUnreadNotifications,
  getUserById,
  getUserSubscribeStories,
  getUserSubscribeStoriesOfAuthor,
  saveHistoryOfUser,
  updateAllNotifications,
  updateNotification,
  updateSaveStory,
  updateUserInformation,
  userBuyStory,
  userSubscribeAuthor,
} from "../controllers/user.controller.js";
import { uploadAvatarAndBackground } from "../middlewares/upload_image.js";

const userRouter = express.Router();

userRouter.post("/history/:id", addStoryToHistory);
userRouter.get("/history/all/:id", getHistoryByUserId);
userRouter.post("/saved/:id", saveHistoryOfUser);
userRouter.get("/saved/all/:id", getSavedStoryByUserId);
userRouter.get("/saved/story/:id", checkSaved);
userRouter.post("/saved/story/:id", updateSaveStory);
userRouter.get("/subscribe/:id", getUserSubscribeStories);
userRouter.get("/story/subscribe/:id", getUserSubscribeStoriesOfAuthor);
userRouter.get("/notification/all/:id", getAllNotifications);
userRouter.get("/notification/unread/:id", getUnreadNotifications);
userRouter.patch("/notification/:id", updateNotification);
userRouter.patch("/notification/all/:id", updateAllNotifications);
userRouter.get("/paid/:id", checkUserPaidStory);
userRouter.post("/buy/:id", userBuyStory);
userRouter.patch("/changePassword/:id", changePassword);
userRouter.post("/subscribe/:id", userSubscribeAuthor);

userRouter.patch("/update/:id", uploadAvatarAndBackground, updateUserInformation);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);

export default userRouter;
