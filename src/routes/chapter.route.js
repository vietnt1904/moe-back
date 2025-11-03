import express from "express";
import { getAllChaptersByStoryId, getAuthorChapter, getChapterById, getNextChapter, getPreviousChapter, writeChapter } from "../controllers/chapter.controller.js";

const chapterRouter = express.Router();

chapterRouter.get("/author/:title", getAuthorChapter);
chapterRouter.get("/:title", getChapterById);
chapterRouter.get("/:id/previous", getPreviousChapter);
chapterRouter.get("/:id/next", getNextChapter);
chapterRouter.post("/writechapter", writeChapter);
chapterRouter.get("/", getAllChaptersByStoryId);

export default chapterRouter;