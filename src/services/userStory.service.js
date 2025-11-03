import { col, Op, where } from "sequelize";
import { User } from "../models/user.model.js";
import { UserStory } from "../models/userStory.model.js";
import { Story } from "../models/story.model.js";
import { Chapter } from "../models/chapter.model.js";
import userService from "./user.service.js";

const UserStoryService = {
  async getAllReadStoriesByUserId(userId) {
    try {
      const stories = await UserStory.findAll({
        where: { userId: userId },
        include: {
          model: Story,
          as: "Story",
          where: { status: "active" },
          include: {
            model: Chapter,
            as: "Chapters",
            where: {
              id: { [Op.eq]: col("UserStory.lastChapter") },
              status: "published",
            },
          },
        },
        order: [["updatedAt", "DESC"]],
      });
      return stories;
    } catch (error) {
      console.error("Error when get read story by user Id:", error);
      throw error;
    }
  },

  async getSavedStoryByUserId(userId) {
    try {
      const stories = await UserStory.findAll({
        where: { userId: userId, isSave: true },
        include: {
          model: Story,
          as: "Story",
        },
      });
      return stories;
    } catch (error) {
      console.error("Error when get read story by user Id:", error);
      throw error;
    }
  },

  async checkSaved(userId, storyId) {
    try {
      const isSaved = await UserStory.findOne({
        attributes: ["isSave"],
        where: { userId: userId, storyId: storyId },
      });
      return isSaved;
    } catch (error) {
      console.error("Error check saved story:", error);
      throw error;
    }
  },

  async addUserStory(
    userId,
    storyId,
    lastChapter,
    isFinish = false,
    isSave = false
  ) {
    try {
      const addStory = await UserStory.findOne({
        where: { userId: userId, storyId: storyId },
      });
      let story;      
      if (!!addStory) {
        let maxChapter = Math.max(lastChapter, addStory?.lastChapter || 0);
        story = await UserStory.update(
          { lastChapter: maxChapter, isFinish: isFinish, isSave: isSave },
          { where: { userId: userId, storyId: storyId } }
        );
      } else {
        story = await UserStory.create({
          userId,
          storyId,
          lastChapter,
          isFinish,
          isSave,
        });
      }
      return story;
    } catch (error) {
      console.error("Error when add user story", error);
      throw error;
    }
  },

  async updateSaveStory(
    userId,
    storyId,
    lastChapter,
    isFinish = false,
    isSave = false
  ) {
    try {
      const isExit = await UserStory.findOne({
        where: { userId: userId, storyId: storyId },
      });      
      let isUpdated = false;
      if (!isExit) {
        isUpdated = await this.addUserStory(
          userId,
          storyId,
          lastChapter,
          isFinish,
          isSave
        );
      } else {
        let maxChapter = Math.max(lastChapter, isExit?.lastChapter || 0);
        isUpdated = await UserStory.update({
          userId,
          storyId,
          lastChapter: maxChapter,
          isFinish,
          isSave,
        });
      }
      return isUpdated;
    } catch (error) {
      console.log("Error when update user story");
      throw error;
    }
  },

  async updateIsSaveStory(userId, storyId, isSave) {
    try {
      const isExit = await UserStory.findOne({
        where: { userId: userId, storyId: storyId },
      });
      if (!isExit) {        
        const userStory = await UserStory.create({
          userId: userId,
          storyId: storyId,
          isSave: isSave,
        });
        return userStory;
      } else {
        const isUpdated = await UserStory.update(
          { isSave: isSave },
          {
            where: { userId: userId, storyId: storyId },
          }
        );
        return isUpdated > 0;
      }
    } catch (error) {
      console.log("Error when update user story");
      throw error;
    }
  },

  async getUsersToSendNoticeByStoryId(storyId) {
    try {
      const listUsers = User.findAll({
        attributes: ["id", "email"],
        include: [
          {
            model: UserStory,
            where: { storyId: storyId, isSubcribe: true },
            attributes: [],
          },
        ],
        group: ["id", "email"],
        raw: true,
      });
      if (!listUsers) {
        return {
          success: false,
          message:
            "An error occurred when get list users to send notice by storyId",
        };
      }
      return {
        success: true,
        message: "Get list users to send notice successfully.",
        listUsers: listUsers,
      };
    } catch (error) {
      console.log("Error when get list users");
      throw error;
    }
  },

  async checkUserPaidStory(userId, storyId) {
    try {
      const isPaid = await UserStory.findOne({
        attributes: ["isPaid"],
        where: { userId: userId, storyId: storyId },
      });

      return isPaid;
    } catch (error) {
      console.error("Error check user paid story:", error);
      throw error;
    }
  },

  async userBuyStory(userId, storyId, spiritStones) {
    try {
      const isPaid = await UserStory.update(
        { isPaid: true },
        { where: { userId: userId, storyId: storyId } }
      );
      await userService.updateUserStones(userId, (Number(spiritStones) * (-1)));
      return isPaid > 0;
    } catch (error) {
      console.error("Error user buy story:", error);
      throw error;
    }
  },

  async getUserSubscribeStories(userId) {
    try {
      const stories = await UserStory.findAll({
        where: { userId: userId, isSubcribe: true },
        include: { model: Story, as: "Story", where: { status: "active" } },
      });
      return stories;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UserStoryService;
