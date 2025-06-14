import express from "express";
import {
  getAllPendingStoriesAdmin,
  getAllStoriesAdmin,
  getPendingStoryByIdAdmin,
  getStoryByIdAdmin,
  updateStoryStatusAdmin,
} from "../controllers/story.controller.js";
import {
  getAllPendingChaptersAdmin,
  getAllStoryChaptersAdmin,
  getChapterByIdAdmin,
  getPendingChapterByIdAdmin,
  updateChapterStatusAdmin,
} from "../controllers/chapter.controller.js";
import { getAdminInfor } from "../controllers/auth.controller.js";
import { getAllUsers, getUserById, updateUserByIdAdmin } from "../controllers/user.controller.js";
const adminRouter = express.Router();

// ----------- story -----------
adminRouter.get("/story/allstories", getAllStoriesAdmin);
adminRouter.get("/story/allstories/:id", getStoryByIdAdmin);
adminRouter.get("/story/pendingstories", getAllPendingStoriesAdmin);
adminRouter.get("/story/pendingstories/:id", getPendingStoryByIdAdmin);

adminRouter.patch("/story/pendingstories/:id", updateStoryStatusAdmin);

// ----------- chapter -----------
adminRouter.get("/chapter/allstorychapters/:id", getAllStoryChaptersAdmin);
adminRouter.get("/chapter/allchapters/:id", getChapterByIdAdmin);
adminRouter.get("/chapter/pendingchapters", getAllPendingChaptersAdmin);
adminRouter.get("/chapter/pending/:id", getPendingChapterByIdAdmin);

adminRouter.patch("/chapter/pending/:id", updateChapterStatusAdmin);

// ----------- comment -----------
// adminRouter.get("/comment/allcomments");

// ----------- user -----------
adminRouter.get("/user/allusers", getAllUsers);
adminRouter.get("/user/allusers/:id", getUserById);

adminRouter.patch("/user/allusers/:id", updateUserByIdAdmin);

// ----------- author -----------
// adminRouter.get("/author/allauthors");

adminRouter.get("/accountinfor/:id", getAdminInfor)

export default adminRouter;
