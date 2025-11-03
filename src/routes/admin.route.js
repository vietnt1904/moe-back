import express from "express";
import {
  changeStoryStatusAdmin,
  getAllPendingStoriesAdmin,
  getAllStoriesAdmin,
  getPendingStoryByIdAdmin,
  getStoryByIdAdmin,
  updateStoryStatusAdmin,
} from "../controllers/story.controller.js";
import {
  changeChapterStatusAdmin,
  getAllPendingChaptersAdmin,
  getAllStoryChaptersAdmin,
  getChapterByIdAdmin,
  getPendingChapterByIdAdmin,
  updateChapterStatusAdmin,
} from "../controllers/chapter.controller.js";
import { getAdminInfor } from "../controllers/auth.controller.js";
import { getAllUsers, getUserById, updateUserByIdAdmin, updateUserRole } from "../controllers/user.controller.js";
import { getAdminTopics } from "../controllers/topic.controller.js";
import { getAdminGenres } from "../controllers/genre.controller.js";
import { addBanner, getAdminBanners, stopAllBanners, updateBannerData, updateBannerStatus } from "../controllers/banner.controller.js";
import { uploadAvatar } from "../middlewares/upload_image.js";
const adminRouter = express.Router();

// ----------- story -----------
adminRouter.get("/story/allstories", getAllStoriesAdmin);
adminRouter.get("/story/allstories/:id", getStoryByIdAdmin);
adminRouter.get("/story/pendingstories", getAllPendingStoriesAdmin);
adminRouter.get("/story/pendingstories/:id", getPendingStoryByIdAdmin);

adminRouter.patch("/story/pendingstories/:id", updateStoryStatusAdmin);

adminRouter.patch("/story/changestatus/:id", changeStoryStatusAdmin);

// ----------- chapter -----------
adminRouter.get("/chapter/allstorychapters/:id", getAllStoryChaptersAdmin);
adminRouter.get("/chapter/allchapters/:id", getChapterByIdAdmin);
adminRouter.get("/chapter/pendingchapters", getAllPendingChaptersAdmin);
adminRouter.get("/chapter/pending/:id", getPendingChapterByIdAdmin);

adminRouter.patch("/chapter/pending/:id", updateChapterStatusAdmin);

adminRouter.patch("/chapter/changestatus/:id", changeChapterStatusAdmin);

// ----------- comment -----------
// adminRouter.get("/comment/allcomments");

// ----------- topic -----------
adminRouter.get("/topic", getAdminTopics);

// ----------- genre -----------
adminRouter.get("/genre", getAdminGenres);

// ----------- user -----------
adminRouter.get("/user/allusers", getAllUsers);
adminRouter.get("/user/allusers/:id", getUserById);

adminRouter.patch("/user/allusers/:id", updateUserByIdAdmin);
adminRouter.patch("/user/changerole/:id", updateUserRole);

// ----------- author -----------
// adminRouter.get("/author/allauthors");

adminRouter.get("/accountinfor/:id", getAdminInfor);

// ----------- banner -----------
adminRouter.get("/banner/all", getAdminBanners);
adminRouter.post("/banner", uploadAvatar, addBanner);
adminRouter.post("/banner/stopall", stopAllBanners);
adminRouter.patch("/banner/:id", updateBannerStatus);
adminRouter.put("/banner/:id", uploadAvatar, updateBannerData);

export default adminRouter;
