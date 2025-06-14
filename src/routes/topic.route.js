import express from "express";
import { getAllTopics } from "../controllers/topic.controller.js";

const topicRouter = express.Router();

topicRouter.get("/", getAllTopics);

export default topicRouter;