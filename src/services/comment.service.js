import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";

const CommentService = {
  async getCommentsByStoryId(storyId, offset, limit, orderBy, isDesc) {
    try {
      const orderType = orderBy === "time" ? "createdAt" : "likes";
      const desc = isDesc === "true" ? "desc" : "asc";
      let order;
      if (orderBy === "time") {
        order = [[orderType, desc]];
      } else {
        order = [
          [orderType, desc],
          ["createdAt", "desc"],
        ];
      }
      const comments = await Comment.findAll({
        where: {
          storyId: storyId,
        },
        include: {
          model: User,
          as: "User",
          attributes: ["id", "fullName", "email", "avatar"],
        },
        offset: Number(offset),
        limit: Number(limit),
        order: order,
      });
      const totalComments = await Comment.count({
        where: { storyId: storyId },
      });
      return { comments, totalComments };
    } catch (error) {
      console.error("Error get comments:", error);
      throw error;
    }
  },

  async getCommentsByUserId(userId) {
    try {
      const comments = await Comment.findAll({
        where: {
          userId: userId,
        },
      });
      return comments;
    } catch (error) {
      console.error("Error get comments:", error);
      throw error;
    }
  },

  async getCommentsByStoryIdAndChapterId(storyId, chapterId) {
    try {
      const comments = await Comment.findAll({
        where: {
          storyId: storyId,
          chapterId: chapterId,
        },
      });
      return comments;
    } catch (error) {
      console.error("Error get comments:", error);
      throw error;
    }
  },

  async addCommentFromChapter(data) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (error) {
      console.error("Error add comment:", error);
      throw error;
    }
  },
};

export default CommentService;
