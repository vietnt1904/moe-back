import express from "express";
import {
  createStory,
  getProposalStories,
  getStoriesAllTopics,
  getStoriesByAuthor,
  getStoriesByTopic,
  getStoryById,
  getStoryList,
  getTrendingStory,
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

storyRouter.put("/update/:id", uploadAvatar, updateStory);

storyRouter.get("/:title", getStoryById);
storyRouter.get("/", getStoryList);

export default storyRouter;
