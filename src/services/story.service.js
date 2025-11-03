import { Op, Sequelize } from "sequelize";
import { Story } from "../models/story.model.js";
import { Genre } from "../models/genre.model.js";
import { Topic } from "../models/topic.model.js";
import { User } from "../models/user.model.js";
import { Chapter } from "../models/chapter.model.js";
import { UserStory } from "../models/userStory.model.js";

const StoryService = {
  async getStoryList(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const response = await Story.findAll({
        where: { status: "active" },
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
        limit: Number(limit),
        offset: Number(offset),
      });

      const totalRecords = await Story.count();
      const totalPages = Math.ceil(totalRecords / limit);
      return {
        stories: response,
        totalPages: totalPages,
      };
    } catch (error) {
      console.error("Error get story list:", error);
      throw error;
    }
  },

  async getStoryById(id, slug) {
    try {
      // await Story.increment("views", {
      //   by: 1,
      //   where: { id: id, slug: slug, status: "active" },
      // });
      const story = await Story.findOne({
        where: { id: id, slug: slug, status: "active" },
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
        ],
      });
      return story;
    } catch (error) {
      console.error("Error get story by ID:", error);
      throw error;
    }
  },

  async getStoryByIdOfAuthor(id, slug) {
    try {
      const story = await Story.findOne({
        where: { id: id, slug: slug },
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
        ],
      });
      return story;
    } catch (error) {
      console.error("Error get story by ID:", error);
      throw error;
    }
  },

  async getStoriesFilter(page, limit, genre, topic, search) {
    try {
      const whereClause = {
        status: "active",
      };
      if (genre) {
        whereClause.genreId = genre;
      }
      if (topic) {
        whereClause.topicId = topic;
      }
      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } },
          { genre: { [Op.like]: `%${search}%` } },
          { topic: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } },
        ];
      }
      const offset = (page - 1) * limit;
      const response = await Story.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
        limit: Number(limit),
        offset: Number(offset),
      });

      const totalRecords = await Story.count({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { content: { [Op.like]: `%${search}%` } },
          ],
        },
      });
      const totalPages = Math.ceil(totalRecords / limit);
      return {
        stories: response,
        totalPages: totalPages,
      };
    } catch (error) {
      console.error("Error get story filter:", error);
      throw error;
    }
  },

  async getStoriesByAuthor(authorId) {
    try {
      const stories = await Story.findAll({
        where: { authorId: authorId, status: "active" },
      });
      return stories;
    } catch (error) {
      console.error("Error get stories by author:", error);
      throw error;
    }
  },

  async getAllStoriesOfAuthor(authorId) {
    try {
      const stories = await Story.findAll({
        where: { authorId: authorId },
      });
      return stories;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getStoriesByGenre(genreId) {
    try {
      const stories = await Story.findAll({
        where: { genreId: genreId, status: "active" },
        include: [
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
            attributes: ["id", "name"],
          },
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
      });
      return stories;
    } catch (error) {
      console.error("Error get stories by genre:", error);
      throw error;
    }
  },

  async getStoriesByTopic(topicId) {
    try {
      const stories = await Story.findAll({
        include: [
          {
            model: Topic,
            as: "Topics",
            where: { id: topicId },
            through: { attributes: [] },
          },
          {
            model: Genre,
            as: "Genres",
            through: { attributes: [] },
          },
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        where: { status: "active" },
        order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
      });
      return stories;
    } catch (error) {
      console.error("Error get stories by topic:", error);
      throw error;
    }
  },

  async getStoriesAllTopics() {
    const limit = 20;
    try {
      const topics = await Topic.findAll({ where: { isActive: true } });
      const result = [];
      for (const topic of topics) {
        const stories = await topic.getStories({
          where: { status: "active" },
          include: [
            {
              model: Genre,
              as: "Genres",
            },
            {
              model: Topic,
              as: "Topics",
            },
            {
              model: User,
              as: "Author",
              attributes: ["id", "fullName", "email"],
            },
            {
              model: Chapter,
              as: "Chapters",
              attributes: [],
              where: { status: "published" },
              required: true,
            },
          ],
          limit: limit,
          order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
        });

        result.push({
          id: topic.id,
          name: topic.name,
          stories: stories,
        });
      }
      return result;
    } catch (error) {
      console.error("Error get stories all topics:", error);
      throw error;
    }
  },

  async searchStories(offset, limit, title, author) {
    try {
      const stories = await Story.findAll({
        where: {
          [Op.and]: [
            { title: { [Op.like]: `%${title}%` } },
            { authorName: { [Op.like]: `%${author}%` } },
          ],
          status: "active",
        },
        include: [
          {
            model: Genre,
            as: "Genres",
            through: { attributes: [] },
          },
          {
            model: Topic,
            as: "Topics",
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        limit: Number(limit),
        offset: Number(offset),
        order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
      });
      const total = await Story.count({
        where: {
          [Op.and]: [
            { title: { [Op.like]: `%${title}%` } },
            { authorName: { [Op.like]: `%${author}%` } },
          ],
          status: "active",
        },
      });
      return { stories, total };
    } catch (error) {
      console.error("Error search stories:", error);
      throw error;
    }
  },

  async getStoriesFinished() {
    try {
      const stories = await Story.findAll({
        where: { finished: true, status: "active" },
      });
      return stories;
    } catch (error) {
      console.error("Error get stories finished:", error);
      throw error;
    }
  },

  async getDraffStory() {
    try {
      const stories = await Story.findAll({ where: { status: "draft" } });
      return stories;
    } catch (error) {
      console.error("Error get draff story:", error);
      throw error;
    }
  },

  async getTrendingStory() {
    try {
      const limit = 20;
      const stories = await Story.findAll({
        where: { status: "active" },
        include: [
          { model: Genre, as: "Genres", attributes: [] },
          { model: Topic, as: "Topics", attributes: [] },
          { model: User, as: "Author", attributes: [] },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        limit: limit,
        order: [[{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"]],
      });
      return stories;
    } catch (error) {
      console.error("Error get trending story:", error);
      throw error;
    }
  },

  async getProposalStories() {
    try {
      const limit = 20;
      const stories = await Story.findAll({
        where: { status: "active" },
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
          {
            model: Chapter,
            as: "Chapters",
            attributes: [],
            where: { status: "published" },
            required: true,
          },
        ],
        limit: limit,
        order: [
          [{ model: Chapter, as: "Chapters" }, "createdAt", "DESC"],
          ["views", "DESC"],
          ["likes", "DESC"],
        ],
      });
      return stories;
    } catch (error) {
      console.error("Error get proposal stories:", error);
      throw error;
    }
  },

  async getStoryFollowers(storyId) {
    try {
      const followers = await UserStory.count({
        where: { storyId: storyId, isSave: true },
      });
      return followers;
    } catch (error) {
      console.error("Error get story followers:", error);
      throw error;
    }
  },

  async getTop10() {
    try {
      const top10 = await Story.findAll({
        attributes: {
          include: [
            Sequelize.literal(
              "CASE WHEN rating = 0 THEN 0 ELSE star/rating END",
              "ratingPoint"
            ),
          ],
        },
        order: [
          ["views", "DESC"],
          [
            Sequelize.literal(
              "CASE WHEN rating = 0 THEN 0 ELSE star/rating END"
            ),
            "DESC",
          ],
        ],
        limit: 10,
      });
      return top10;
    } catch (error) {
      console.error("Error get top 10 stories:", error);
      throw error;
    }
  },

  async getInforToBuyStory(storyId) {
    try {
      const story = await Story.findOne({
        where: { id: storyId },
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["id", "fullName", "email"],
          },
        ],
      });
      return story;
    } catch (error) {
      console.error("Error get infor to buy story:", error);
      throw error;
    }
  },

  async getUserSubscribeStoriesOfAuthor(userId, authorId) {
    try {
      const stories = await UserStory.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Story,
            as: "Story",
            where: {
              authorId: authorId,
            },
          },
        ],
      });
      return stories;
    } catch (error) {
      console.error("Error get user subscribe stories of author:", error);
      throw error;
    }
  },

  // ----------- CREATE STORY -----------

  async createStory(data) {
    const { genre, topic, ...storyData } = data;
    try {
      const story = await Story.create(storyData);

      if (genre && genre.length > 0) {
        await story.setGenres(genre);
      }

      if (topic && topic.length > 0) {
        await story.setTopics(topic);
      }

      return story;
    } catch (error) {
      console.error("Error create story:", error);
      throw error;
    }
  },

  // ----------- UPDATE STORY -----------

  async updateStory(id, data) {
    try {
      const story = await Story.update(data, { where: { id: id } });
      return story;
    } catch (error) {
      console.error("Error update story:", error);
      throw error;
    }
  },

  // ----------- DELETE STORY -----------

  async deleteStory(id) {
    try {
      const story = await Story.destroy({ where: { id: id } });
      return story;
    } catch (error) {
      console.error("Error delete story:", error);
      throw error;
    }
  },

  // ----------- ADD VIEW, LIKE, DISLIKE -----------

  async addView(id) {
    try {
      const story = await Story.increment("views", { where: { id: id } });
      return story;
    } catch (error) {
      console.error("Error add view:", error);
      throw error;
    }
  },

  async addLike(id) {
    try {
      const story = await Story.increment("likes", { where: { id: id } });
      return story;
    } catch (error) {
      console.error("Error add like:", error);
      throw error;
    }
  },

  async addDislike(id) {
    try {
      const story = await Story.increment("dislikes", { where: { id: id } });
      return story;
    } catch (error) {
      console.error("Error add dislike:", error);
      throw error;
    }
  },

  // ----------- ADD COMMENT -----------

  async addComment(id, data) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (error) {
      console.error("Error add comment:", error);
      throw error;
    }
  },

  async deleteComment(id) {
    try {
      const comment = await Comment.destroy({ where: { id: id } });
      return comment;
    } catch (error) {
      console.error("Error delete comment:", error);
      throw error;
    }
  },

  async updateComment(id, data) {
    try {
      const comment = await Comment.update(data, { where: { id: id } });
      return comment;
    } catch (error) {
      console.error("Error update comment:", error);
      throw error;
    }
  },

  async getAllCommentsByStoryId(storyId) {
    try {
      const comments = await Comment.findAll({
        where: { storyId: storyId },
      });
      return comments;
    } catch (error) {
      console.error("Error get all comments:", error);
      throw error;
    }
  },

  async getCommentById(id) {
    try {
      const comment = await Comment.findOne({ where: { id: id } });
      return comment;
    } catch (error) {
      console.error("Error get comment by ID:", error);
      throw error;
    }
  },

  // ------------------------------------------------
  // ------------------------------------------------
  // ------------------ ADMIN ----------------------

  async getAllStoriesAdmin() {
    try {
      const stories = await Story.findAll({
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
        ],
      });
      return stories;
    } catch (error) {
      console.error("Error get all stories:", error);
      throw error;
    }
  },

  async getStoryByIdAdmin(id) {
    try {
      const story = await Story.findOne({
        where: { id: id },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
        ],
      });
      return story;
    } catch (error) {
      console.error("Error get story by ID:", error);
      throw error;
    }
  },

  async getAllPendingStoriesAdmin() {
    try {
      const stories = await Story.findAll({
        where: { status: "pending" },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
        ],
      });
      return stories;
    } catch (error) {
      console.error("Error get pending story:", error);
      throw error;
    }
  },

  async getPendingStoryByIdAdmin(id) {
    try {
      const story = await Story.findOne({
        where: { id: id, status: "pending" },
        include: [
          {
            model: User,
            as: "Author",
          },
          {
            model: Genre,
            as: "Genres",
          },
          {
            model: Topic,
            as: "Topics",
          },
        ],
      });
      return story;
    } catch (error) {
      console.error("Error get pending story by ID:", error);
      throw error;
    }
  },

  async updateStoryStatusAdmin(id, status) {
    try {
      const story = await Story.update(
        { status: status === "accept" ? "active" : "rejected" },
        { where: { id: id } }
      );
      return story;
    } catch (error) {
      console.error("Error update story status:", error);
      throw error;
    }
  },

  async changeStoryStatusAdmin(id, status) {
    try {
      const story = await Story.update(
        { status: status },
        { where: { id: id } }
      );
      return story > 0 ? true : false;
    } catch (error) {
      console.error("Error change story status:", error);
      throw error;
    }
  },

  async getDraffStory() {
    try {
      const stories = await Story.findAll({ where: { status: "draff" } });
      return stories;
    } catch (error) {
      console.error("Error get draff story:", error);
      throw error;
    }
  },

  async getActiveStories() {
    try {
      const stories = await Story.findAll({ where: { status: "active" } });
      return stories;
    } catch (error) {
      console.error("Error get active stories:", error);
      throw error;
    }
  },
};

export default StoryService;
