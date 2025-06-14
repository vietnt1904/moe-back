import express from "express";
import {
    banAccountController,
    cancelBanScheduledController,
    getBanAccount,
    unbanAccountManualController,
} from "../controllers/ban.controller.js";

const banRouter = express.Router();

banRouter.post("/", banAccountController);
banRouter.post("/unban", unbanAccountManualController);
banRouter.post("/unban-scheduled", cancelBanScheduledController);
banRouter.get("/", getBanAccount);

export default banRouter;
