import express from "express";
import { getAllBanners } from "../controllers/banner.controller.js";

const bannerRouter = express.Router();

bannerRouter.get("/all", getAllBanners);

export default bannerRouter;