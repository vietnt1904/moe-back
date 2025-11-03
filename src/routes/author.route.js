import express from "express";
import { getAllStoriesOfAuthor, getFollowersOfAuthor, getStoryByIdOfAuthor } from "../controllers/user.controller.js";
import checkIdAndToken from "../middlewares/checkIdAndToken.js";

const authorRouter = express.Router();

authorRouter.get("/story/:title", getStoryByIdOfAuthor);
authorRouter.get("/story/all/:id", checkIdAndToken, getAllStoriesOfAuthor);
authorRouter.get("/followers/:id", getFollowersOfAuthor);

export default authorRouter;