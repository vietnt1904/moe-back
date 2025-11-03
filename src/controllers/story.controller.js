import client from "../config/redis.config.js";
import NotificationService from "../services/notification.service.js";
import ReasonUpdateService from "../services/reasonUpdate.service.js";
import StoryService from "../services/story.service.js";
import { getIdTitleFromUrl } from "../utils/index.js";

// ---------- get story ---------

export const getStoryList = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await StoryService.getStoryList(page, limit);
    return res.status(200).json({
      success: true,
      message: "Get story list successfully",
      data: result.stories,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error("Lỗi getStoryList:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get story list! ${error}.`,
    });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const { title } = req.params;
    const { id, slug } = getIdTitleFromUrl(title);
    const story = await StoryService.getStoryById(id, slug);
    return res.status(200).json({
      success: true,
      message: "Get story by ID successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi getStoryById:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get story by ID! ${error}.`,
    });
  }
};

export const getStoriesFilter = async (req, res) => {
  try {
    const { page, limit, genre, topic, search } = req.query;
    const result = await StoryService.getStoriesFilter(
      page,
      limit,
      genre,
      topic,
      search
    );
    return res.status(200).json({
      success: true,
      message: "Get stories filter successfully",
      data: result.stories,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error("Lỗi getStoriesFilter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get stories filter! ${error}.`,
    });
  }
};

export const getStoriesByAuthor = async (req, res) => {
  try {
    const { id: authorId } = req.params;
    const stories = await StoryService.getStoriesByAuthor(authorId);
    return res.status(200).json({
      success: true,
      message: "Get stories by author successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getStoriesByAuthor:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get stories by author! ${error}.`,
    });
  }
};

export const getStoriesByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const stories = await StoryService.getStoriesByGenre(genreId);
    return res.status(200).json({
      success: true,
      message: "Get stories by genre successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getStoriesByGenre:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get stories by genre! ${error}.`,
    });
  }
};

export const getStoriesByTopic = async (req, res) => {
  try {
    const { id: topicId } = req.params;
    const stories = await StoryService.getStoriesByTopic(topicId);
    return res.status(200).json({
      success: true,
      message: "Get stories by topic successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getStoriesByTopic:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get stories by topic! ${error}.`,
    });
  }
};

export const getStoriesAllTopics = async (req, res) => {
  try {
    let stories = null;
    stories = await client.get("storiesAllTopics");
    if (stories !== null) {
      return res.status(200).json({
        success: true,
        message: "Get stories all topics successfully",
        data: JSON.parse(stories),
      });
    }
    stories = await StoryService.getStoriesAllTopics();
    await client.set("storiesAllTopics", JSON.stringify(stories), {
      EX: 300,
    });
    return res.status(200).json({
      success: true,
      message: "Get stories all topics successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getStoriesAllTopics:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get stories all topics! ${error}.`,
    });
  }
};

export const searchStories = async (req, res) => {
  try {
    const { page, limit, title, author } = req.query;
    const offset = (page - 1) * limit;
    const stories = await StoryService.searchStories(
      offset,
      limit,
      title,
      author
    );
    return res.status(200).json({
      success: true,
      message: "Search stories successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi searchStories:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during search stories! ${error}.`,
    });
  }
};

export const getStoriesFinished = async (req, res) => {
  try {
    const stories = await StoryService.getStoriesFinished();
    return res.status(200).json({
      success: true,
      message: "Get stories finished successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getStoriesFinished:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get stories finished! ${error}.`,
    });
  }
};

export const getDraffStory = async (req, res) => {
  try {
    const stories = await StoryService.getDraffStory();
    return res.status(200).json({
      success: true,
      message: "Get draff story successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getDraffStory:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get draff story! ${error}.`,
    });
  }
};

export const getTrendingStory = async (req, res) => {
  try {
    const stories = await StoryService.getTrendingStory();
    return res.status(200).json({
      success: true,
      message: "Get trending story successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getTrendingStory:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get trending story! ${error}.`,
    });
  }
};

export const getProposalStories = async (req, res) => {
  try {
    const stories = await StoryService.getProposalStories();
    return res.status(200).json({
      success: true,
      message: "Get proposal stories successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getProposalStories:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get proposal stories! ${error}.`,
    });
  }
};

export const getStoryFollowers = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const stories = await StoryService.getStoryFollowers(storyId);
    return res.status(200).json({
      success: true,
      message: "Get story followers successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getStoryFollowers:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get story followers! ${error}.`,
    });
  }
};

export const getTop10 = async (req, res) => {
  try {
    const data = await StoryService.getTop10();
    res.status(200).json({
      success: true,
      message: "Get top 10 stories successfully.",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi get top 10:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get top 10 stories! ${error}.`,
    });
  }
};

export const getInforToBuyStory = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const data = await StoryService.getInforToBuyStory(storyId);
    return res.status(200).json({
      success: true,
      message: "Get infor to buy story successfully.",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi get infor to buy story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get infor to buy story! ${error}.`,
    });
  }
};

export const getUserSubscribeStoriesOfAuthor = async (req, res) => {
  try {
    const { userId } = req.query;
    const { id: authorId } = req.params;
    const data = await StoryService.getUserSubscribeStoriesOfAuthor(
      userId,
      authorId
    );
    return res.status(200).json({
      success: true,
      message: "Get user subscribe stories of author successfully.",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi get user subscribe stories of author:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get user subscribed stories of author! ${error}.`,
    });
  }
};

// ---------- create story ---------

export const createStory = async (req, res) => {
  try {
    const story = await StoryService.createStory(req.body);
    return res.status(200).json({
      success: true,
      message: "Create story successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi createStory:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during create story! ${error}.`,
    });
  }
};

// ---------- update story ---------

export const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await StoryService.updateStory(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Update story successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi updateStory:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update story! ${error}.`,
    });
  }
};

// ---------- delete story ---------

export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await StoryService.deleteStory(id);
    return res.status(200).json({
      success: true,
      message: "Delete story successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi deleteStory:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during delete story! ${error}.`,
    });
  }
};

// ---------------------------------------------------
// ---------------------------------------------------
// --------------------- ADMIN ----------------------

export const getAllStoriesAdmin = async (req, res) => {
  try {
    const stories = await StoryService.getAllStoriesAdmin();
    return res.status(200).json({
      success: true,
      message: "Get all stories successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getAllStories:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all stories! ${error}.`,
    });
  }
};

export const getStoryByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await StoryService.getStoryByIdAdmin(id);
    return res.status(200).json({
      success: true,
      message: "Get story by ID successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi getStoryByIdAdmin:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get story by ID! ${error}.`,
    });
  }
};

export const getAllPendingStoriesAdmin = async (req, res) => {
  try {
    const stories = await StoryService.getAllPendingStoriesAdmin();
    return res.status(200).json({
      success: true,
      message: "Get all pending stories successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Lỗi getAllPendingStoriesAdmin:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all pending stories! ${error}.`,
    });
  }
};

export const getPendingStoryByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await StoryService.getPendingStoryByIdAdmin(id);
    return res.status(200).json({
      success: true,
      message: "Get pending story by ID successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi getPendingStoryByIdAdmin:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get pending story by ID! ${error}.`,
    });
  }
};

export const updateStoryStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { storyId, status, reason } = req.body;
    const story = await StoryService.updateStoryStatusAdmin(
      id,
      req.body.status
    );
    const reasonUpdate = await ReasonUpdateService.createReasonUpdate(
      storyId,
      status,
      reason
    );
    const isAccept = status === "accept";
    await NotificationService.sendNotificationByAuthorIdAndStoryId(
      storyId,
      isAccept
    );
    return res.status(200).json({
      success: true,
      message: "Update story status successfully",
      data: story,
      reason: reasonUpdate,
    });
  } catch (error) {
    console.error("Lỗi updateStoryStatusAdmin:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update story status! ${error}.`,
    });
  }
};

export const changeStoryStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const story = await StoryService.changeStoryStatusAdmin(id, status);
    return res.status(200).json({
      success: true,
      message: "Change story status successfully",
      data: story,
    });
  } catch (error) {
    console.error("Lỗi changeStoryStatusAdmin:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during change story status! ${error}.`,
    });
  }
}
