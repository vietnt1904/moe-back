import express from "express";
import {
  createStory,
  getInforToBuyStory,
  getProposalStories,
  getStoriesAllTopics,
  getStoriesByAuthor,
  getStoriesByTopic,
  getStoryById,
  getStoryFollowers,
  getStoryList,
  getTop10,
  getTrendingStory,
  getUserSubscribeStoriesOfAuthor,
  searchStories,
  updateStory,
} from "../controllers/story.controller.js";
import { uploadAvatar } from "../middlewares/upload_image.js";

const storyRouter = express.Router();

storyRouter.get("/filter", getStoryList);
storyRouter.get("/author/:id", getStoriesByAuthor);
storyRouter.get("/writestory", getStoryList);
storyRouter.post("/writestory", uploadAvatar, createStory);
storyRouter.get("/topics", getStoriesAllTopics);
storyRouter.get("/topic/:id", getStoriesByTopic);
storyRouter.get("/search", searchStories);
storyRouter.get("/trending", getTrendingStory);
storyRouter.get("/proposal", getProposalStories);
storyRouter.get("/followers/:id", getStoryFollowers);
storyRouter.get("/mysubscribe/:id", getUserSubscribeStoriesOfAuthor); // id of author
storyRouter.get("/ranking", getTop10);
storyRouter.get("/buy/:id", getInforToBuyStory);

storyRouter.put("/update/:id", uploadAvatar, updateStory);

storyRouter.get("/:title", getStoryById);
storyRouter.get("/", getStoryList);

export default storyRouter;
