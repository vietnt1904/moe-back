import express from "express";
import {
  createTopic,
  getAllTopics,
  updateTopic,
} from "../controllers/topic.controller.js";

const topicRouter = express.Router();

topicRouter.post("/", createTopic);
topicRouter.patch("/:id", updateTopic);
topicRouter.get("/", getAllTopics);

export default topicRouter;
