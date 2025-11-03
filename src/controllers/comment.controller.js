import CommentService from "../services/comment.service.js";

export const getCommentsByStoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit, orderBy, isDesc } = req.query;
    const offset = (page - 1) * limit;
    const comments = await CommentService.getCommentsByStoryId(
      id,
      offset,
      limit,
      orderBy,
      isDesc
    );
    return res.status(200).json({
      success: true,
      message: "Get comments by story successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error get comment by story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get comment by story! ${error}.`,
    });
  }
};

export const getCommentsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await CommentService.getCommentsByUserId(id);
    return res.status(200).json({
      success: true,
      message: "Get comments by user successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error get comment by user:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get comment by user! ${error}.`,
    });
  }
};

export const getCommentsByStoryIdAndChapterId = async (req, res) => {
  try {
    const { storyId, chapterId } = req.params;
    const comments = await CommentService.getCommentsByStoryIdAndChapterId(
      storyId,
      chapterId
    );
    return res.status(200).json({
      success: true,
      message: "Get comments by story and chapter successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error get comment by story and chapter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get comment by story and chapter! ${error}.`,
    });
  }
};

export const addCommentFromChapter = async (req, res) => {
  try {
    const comment = await CommentService.addCommentFromChapter(req.body);
    return res.status(200).json({
      success: true,
      message: "Add comment from chapter successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error add comment from chapter:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during add comment from chapter! ${error}.`,
    });
  }
};
