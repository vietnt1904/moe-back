import express from "express";
import { 
    changeBannerStatus,
    createBanner,
    deleteBanner,
    getBannerById,
    getBanners,
    updateBanner
} from "../controllers/banner.controller.js";

const bannerRouter = express.Router();

bannerRouter.put("/:id", updateBanner);
bannerRouter.put("/:id/status", changeBannerStatus);
bannerRouter.delete("/:id", deleteBanner);
bannerRouter.get("/:id", getBannerById);
bannerRouter.get("/", getBanners);
bannerRouter.post("/", createBanner);

export default bannerRouter;