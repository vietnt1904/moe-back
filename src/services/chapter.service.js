import { Op } from "sequelize";
import { Chapter } from "../models/chapter.model.js";
import { Story } from "../models/story.model.js";

const ChapterService = {
  async getAllChaptersByStoryId(storyId) {
    try {
      const chapters = await Chapter.findAll({
        attributes: [
          "id",
          "chapterNumber",
          "title",
          "slug",
          "status",
          "storyId",
          "views",
          "likes",
          "dislikes",
        ],
        where: { storyId: storyId },
        order: [["chapterNumber", "DESC"]],
      });
      return chapters;
    } catch (error) {
      console.error("Error get all chapters by story ID:", error);
      throw error;
    }
  },

  async getChapterById(id, slug) {
    try {
      await Chapter.increment("views", {
        by: 1,
        where: { id: id, slug: slug },
      });
      const chapter = await Chapter.findOne({ where: { id: id, slug: slug } });
      if (!chapter) {
        return null;
      }
      await Story.increment("views", { by: 1, where: { id: chapter.storyId } });
      return chapter;
    } catch (error) {
      console.error("Error get chapter by ID:", error);
      throw error;
    }
  },

  async getAuthorChapter(id, slug) {
    try {
      const chapter = await Chapter.findOne({ where: { id: id, slug: slug } });
      return chapter;
    } catch (error) {
      console.error("Error get author chapter:", error);
      throw error;
    }
  },

  async getTitleAndAuthorByChapterId(id) {
    try {
      const chapter = await Chapter.findOne({
        attributes: ["storyId", "title", "chapterNumber"],
        where: { id: id },
      });
      return chapter;
    } catch (error) {
      console.error("Error get title and author by chapter ID:", error);
      throw error;
    }
  },

  async getChapterByStoryIdAndChapterNumber(storyId, chapterNumber) {
    try {
      await Chapter.increment("views", {
        by: 1,
        where: { storyId: storyId, chapterNumber: chapterNumber },
      });
      const chapter = await Chapter.findOne({
        where: { storyId: storyId, chapterNumber: chapterNumber },
      });
      await Story.increment("views", { by: 1, where: { id: chapter.storyId } });
      return chapter;
    } catch (error) {
      console.error("Error get chapter by number:", error);
      throw error;
    }
  },

  async getPreviousChapter(storyId, chapterNumber) {
    try {
      const previousChapter = await Chapter.findOne({
        attributes: ["id", "chapterNumber", "title", "storyId"],
        where: {
          storyId: storyId,
          chapterNumber: { [Op.lt]: chapterNumber },
          status: "published",
        },
        order: [["chapterNumber", "DESC"]],
      });
      return previousChapter;
    } catch (error) {
      console.error("Error get previous chapter:", error);
      throw error;
    }
  },

  async getNextChapter(storyId, chapterNumber) {
    try {
      const number = parseFloat(chapterNumber).toFixed(1);
      const nextChapter = await Chapter.findOne({
        attributes: ["id", "chapterNumber", "title", "storyId"],
        where: {
          storyId: storyId,
          chapterNumber: { [Op.gt]: number },
          status: "published",
        },
        order: [["chapterNumber", "ASC"]],
      });
      return nextChapter;
    } catch (error) {
      console.error("Error get next chapter:", error);
      throw error;
    }
  },

  async getFirstChapter(storyId) {
    try {
      await Chapter.increment("views", { by: 1, where: { storyId: storyId } });
      const firstChapter = await Chapter.findOne({
        where: { storyId: storyId },
        order: [["chapterNumber", "ASC"]],
      });
      await Story.increment("views", {
        by: 1,
        where: { id: firstChapter.storyId },
      });
      return firstChapter;
    } catch (error) {
      console.error("Error get first chapter:", error);
      throw error;
    }
  },

  async getLastChapter(storyId) {
    try {
      await Chapter.increment("views", { by: 1, where: { storyId: storyId } });
      const lastChapter = await Chapter.findOne({
        where: { storyId: storyId },
        order: [["chapterNumber", "DESC"]],
      });
      await Story.increment("views", {
        by: 1,
        where: { id: lastChapter.storyId },
      });
      return lastChapter;
    } catch (error) {
      console.error("Error get last chapter:", error);
      throw error;
    }
  },

  // ---------- create chapter -----------

  async createChapter(data) {
    try {
      let { chapterNumber, storyId } = data;

      const nextChapterNumber = (Math.floor(chapterNumber) + 1).toFixed(1);

      let isExitNumber = await Chapter.findOne({
        where: { storyId: storyId, chapterNumber: Number(chapterNumber) },
      });
      while (isExitNumber) {
        chapterNumber = (Number(chapterNumber) + 0.1).toFixed(1);
        if (chapterNumber === nextChapterNumber) {
          return {
            success: false,
            message:
              "Lỗi số chương bổ sung đã tới giới hạn. Hãy viết chương mới",
          };
        }
        isExitNumber = await Chapter.findOne({
          where: { storyId: storyId, chapterNumber: chapterNumber },
        });
      }
      data.chapterNumber = chapterNumber;

      const newChapter = await Chapter.create(data);
      await Story.update(
        { lastUpdate: new Date() },
        { where: { id: storyId } }
      );
      return {
        success: true,
        data: newChapter,
      };
    } catch (error) {
      console.error("Error create chapter:", error);
      throw error;
    }
  },

  // ---------- update chapter -----------

  async updateChapterStatus(id, status) {
    try {
      const updatedChapter = await Chapter.update(
        { status: status },
        { where: { id: id } }
      );
      return updatedChapter;
    } catch (error) {
      console.error("Error update chapter status:", error);
      throw error;
    }
  },

  async updateChapter(id, chapter) {
    try {
      const updatedChapter = await Chapter.update(chapter, {
        where: { id: id },
      });
      return updatedChapter;
    } catch (error) {
      console.error("Error update chapter:", error);
      throw error;
    }
  },

  // ---------- delete chapter -----------

  async deleteChapter(id) {
    try {
      const chapter = await Chapter.destroy({ where: { id: id } });
      return chapter;
    } catch (error) {
      console.error("Error delete chapter:", error);
      throw error;
    }
  },

  async deleteChaptersByStoryId(storyId) {
    try {
      const chapters = await Chapter.destroy({ where: { storyId: storyId } });
      return chapters;
    } catch (error) {
      console.error("Error delete chapters by story ID:", error);
      throw error;
    }
  },

  // --------------------------------------
  // --------------------------------------
  // --------------- ADMIN ----------------

  async getAllStoryChaptersAdmin(storyId) {
    try {
      const chapters = await Chapter.findAll({ where: { storyId: storyId } });
      return chapters;
    } catch (error) {
      console.error("Error get all chapters:", error);
      throw error;
    }
  },

  async getChapterByIdAdmin(id) {
    try {
      const chapter = await Chapter.findOne({ where: { id: id } });
      return chapter;
    } catch (error) {
      console.error("Error get chapter by ID:", error);
      throw error;
    }
  },

  async updateChapterAdmin(id, chapter) {
    try {
      const updatedChapter = await Chapter.update(chapter, {
        where: { id: id },
      });
      return updatedChapter;
    } catch (error) {
      console.error("Error update chapter:", error);
      throw error;
    }
  },

  async updateChapterStatusAdmin(id, status) {
    try {
      const updatedChapter = await Chapter.update(
        { status: status === "accept" ? "published" : "rejected" },
        { where: { id: id } }
      );
      return updatedChapter;
    } catch (error) {
      console.error("Error update chapter status:", error);
      throw error;
    }
  },

  async changeChapterStatusAdmin(id, status) {
    try {
      const updatedChapter = await Chapter.update(
        { status: status },
        { where: { id: id } }
      );
      return updatedChapter > 0 ? true : false;
    } catch (error) {
      console.error("Error change chapter status:", error);
      throw error;
    }
  },

  async deleteChapterAdmin(id) {
    try {
      const chapter = await Chapter.destroy({ where: { id: id } });
      return chapter;
    } catch (error) {
      console.error("Error delete chapter:", error);
      throw error;
    }
  },

  async getAllPendingChaptersAdmin(offset, limit) {
    try {
      const chapters = await Chapter.findAll({
        where: { status: "pending" },
        include: {
          model: Story,
          as: "Story",
        },
        offset: Number(offset),
        limit: Number(limit),
      });
      return chapters;
    } catch (error) {
      console.error("Error get all pending chapters:", error);
      throw error;
    }
  },

  async getPendingChapterByIdAdmin(id) {
    try {
      const chapter = await Chapter.findOne({
        where: { id: id, status: "pending" },
        include: {
          model: Story,
          as: "Story",
        },
      });
      return chapter;
    } catch (error) {
      console.error("Error get pending chapter by ID:", error);
      throw error;
    }
  },
};

export default ChapterService;
