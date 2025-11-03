import express from "express";
import {
    addCommentFromChapter,
  getCommentsByStoryId,
  getCommentsByStoryIdAndChapterId,
  getCommentsByUserId,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/story/:id", getCommentsByStoryId);
commentRouter.get("/chapter/:id", getCommentsByStoryIdAndChapterId);
commentRouter.get("/user/:id", getCommentsByUserId);

commentRouter.post("/user", addCommentFromChapter);

export default commentRouter;
