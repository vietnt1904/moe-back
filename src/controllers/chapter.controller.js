import ChapterService from "../services/chapter.service.js";
import NotificationService from "../services/notification.service.js";
import UserStoryService from "../services/userStory.service.js";
import { getIdTitleFromUrl } from "../utils/index.js";

export const getAllChaptersByStoryId = async (req, res) => {
  try {
    const { storyId } = req.query;

    if (!storyId) {
      return res.status(400).json({
        success: false,
        message: "Missing storyId in query parameters",
      });
    }

    const storyIdNum = parseInt(storyId);

    if (isNaN(storyIdNum)) {
      return res.status(400).json({
        success: false,
        message: "storyId must be a valid number",
      });
    }

    const chapters = await ChapterService.getAllChaptersByStoryId(storyIdNum);

    return res.status(200).json({
      success: true,
      message: "Get all chapters by story ID successfully",
      chapters,
    });
  } catch (error) {
    console.error("Error get all chapters by story ID:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all chapters by story ID! ${error.message}`,
    });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const { title } = req.params;
    const { id, slug } = getIdTitleFromUrl(title);
    const chapter = await ChapterService.getChapterById(id, slug);
    return res.status(200).json({
      success: true,
      message: "Get chapter by ID successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get chapter by ID:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get chapter by ID! ${error}.`,
    });
  }
};

export const getAuthorChapter = async (req, res) => {
  try {
    const { title } = req.params;
    const { id, slug } = getIdTitleFromUrl(title);
    const chapter = await ChapterService.getAuthorChapter(id, slug);
    return res.status(200).json({
      success: true,
      message: "Get author chapter successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get author chapter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get author chapter! ${error}.`,
    });
  }
};

export const getChapterByStoryIdAndChapterNumber = async (req, res) => {
  try {
    const { storyId, chapterNumber } = req.query;
    const chapter = await ChapterService.getChapterByStoryIdAndChapterNumber(
      storyId,
      chapterNumber
    );
    return res.status(200).json({
      success: true,
      message: "Get chapter by story ID and chapter number successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get chapter by story ID and chapter number:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get chapter by story ID and chapter number! ${error}.`,
    });
  }
};

export const getPreviousChapter = async (req, res) => {
  try {
    const { storyId, chapterNumber } = req.query;
    const chapter = await ChapterService.getPreviousChapter(
      storyId,
      chapterNumber
    );
    return res.status(200).json({
      success: true,
      message: "Get previous chapter successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get previous chapter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get previous chapter! ${error}.`,
    });
  }
};

export const getNextChapter = async (req, res) => {
  try {
    const { storyId, chapterNumber } = req.query;
    const chapter = await ChapterService.getNextChapter(storyId, chapterNumber);
    return res.status(200).json({
      success: true,
      message: "Get next chapter successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get next chapter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get next chapter! ${error}.`,
    });
  }
};

export const writeChapter = async (req, res) => {
  try {
    const chapter = await ChapterService.createChapter(req.body);

    if (!chapter?.success) {
      return res.status(200).json({
        success: false,
        message: chapter?.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Create chapter successfully!",
      data: chapter,
    });
  } catch (error) {
    console.log("Error in create chapter: ", error?.message);
    return res.status(500).json({
      success: false,
      message: `An error occurred during create story! ${error}.`,
    });
  }
};

// -----------------------------------------
// -----------------------------------------
// ----------------- ADMIN -----------------

export const getAllStoryChaptersAdmin = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const chapters = await ChapterService.getAllStoryChaptersAdmin(storyId);
    return res.status(200).json({
      success: true,
      message: "Get all chapters successfully",
      chapters,
    });
  } catch (error) {
    console.error("Error get all chapters:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all chapters! ${error}.`,
    });
  }
};

export const getChapterByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await ChapterService.getChapterByIdAdmin(id);
    return res.status(200).json({
      success: true,
      message: "Get chapter by ID successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get chapter by ID:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get chapter by ID! ${error}.`,
    });
  }
};

export const updateChapterAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await ChapterService.updateChapterAdmin(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Update chapter successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error update chapter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update chapter! ${error}.`,
    });
  }
};

export const updateChapterStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    const chapter = await ChapterService.updateChapterStatusAdmin(id, status);
    const data = await ChapterService.getTitleAndAuthorByChapterId(id);
    
    const isAccept = status === "accept";
    await NotificationService.sendNotificationToAuthorByChapter(
      data.storyId,
      data.chapterNumber,
      isAccept
    );
    return res.status(200).json({
      success: true,
      message: "Update chapter status successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error update chapter status:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update chapter status! ${error}.`,
    });
  }
};

export const changeChapterStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const chapter = await ChapterService.changeChapterStatusAdmin(id, status);
    return res.status(200).json({
      success: true,
      message: "Change chapter status successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error change chapter status:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during change chapter status! ${error}.`,
    });
  }
};

export const getAllPendingChaptersAdmin = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    const chapters = await ChapterService.getAllPendingChaptersAdmin(
      offset,
      limit
    );
    return res.status(200).json({
      success: true,
      message: "Get all pending chapters successfully",
      chapters,
    });
  } catch (error) {
    console.error("Error get all pending chapters:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all pending chapters! ${error}.`,
    });
  }
};

export const getPendingChapterByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await ChapterService.getPendingChapterByIdAdmin(id);
    return res.status(200).json({
      success: true,
      message: "Get pending chapter by ID successfully",
      data: chapter,
    });
  } catch (error) {
    console.error("Error get pending chapter by ID:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get pending chapter by ID! ${error}.`,
    });
  }
};
