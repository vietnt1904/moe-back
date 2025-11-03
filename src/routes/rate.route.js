
import express from "express";
import { addRateByUserId, getRatesByStoryId, getRatesByUserId } from "../controllers/rate.controller.js";

const rateRouter = express.Router();

rateRouter.get("/story/:id", getRatesByStoryId);
rateRouter.get("/user/:id", getRatesByUserId);
rateRouter.post("/user", addRateByUserId);

export default rateRouter;