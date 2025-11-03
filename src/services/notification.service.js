import { Notification } from "../models/notification.model.js";
import { Story } from "../models/story.model.js";
import { UserStory } from "../models/userStory.model.js";
import { slugify } from "../utils/index.js";

const NotificationService = {
  async getAllNotifications(userId, offset, limit) {
    try {
      const notifications = await Notification.findAll({
        where: {
          userId: userId,
        },
        order: [["createdAt", "DESC"]],
        offset,
        limit,
      });
      return notifications;
    } catch (error) {
      console.log("error get all notifications", error);
      throw error;
    }
  },

  async getUnreadNotifications(userId) {
    try {
      const notifications = await Notification.count({
        where: {
          userId: userId,
          isRead: false,
        },
        order: [["createdAt", "DESC"]],
      });
      return notifications;
    } catch (error) {
      console.log("error get unread notifications", error);
      throw error;
    }
  },

  async updateNotification(notificationId, isRead) {
    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }
      notification.isRead = isRead;
      await notification.save();
      return notification;
    } catch (error) {
      console.log("error update notification", error);
      throw error;
    }
  },

  async updateAllNotifications(userId) {
    try {
      const notifications = await Notification.update(
        { isRead: true },
        { where: { userId: userId } }
      );
      return notifications;
    } catch (error) {
      console.log("error update all notifications", error);
      throw error;
    }
  },

  async sendNotificationByAuthorIdAndStoryId( storyId, isAccept) {
    try {
      const story = await Story.findByPk(storyId);
      if (!story) {
        throw new Error("Story not found");
      }
      if (isAccept) {
        const content = `Bộ truyện "${story.title}" của bạn đã được chấp nhận bởi quản trị viên.`;
        const notification = await Notification.create({
          userId: story.authorId,
          storyUrl: `${slugify(story.title)}-${story.id}`,
          image: story.image,
          content,
          isRead: false,
        });
        return notification;
      } else {
        const content = `Bộ truyện "${story.title}" của bạn đã bị từ chối bởi quản trị viên.`;
        const notification = await Notification.create({
          userId: story.authorId,
          storyUrl: `${slugify(story.title)}-${story.id}`,
          image: story.image,
          content,
          isRead: false,
        });
        return notification;
      }
    } catch (error) {
      console.log("error send notification by story id", error);
      throw error;
    }
  },

  async sendNotificationToAuthorByChapter(
    storyId,
    chapterNumber,
    isAccept
  ) {
    try {
      const story = await Story.findByPk(storyId);
      if (!story) {
        throw new Error("Story not found");
      }
      if (isAccept) {
        const isSendToAuthor = await Notification.create({
          userId: story.authorId,
          storyUrl: `${slugify(story.title)}-${story.id}`,
          image: story.image,
          content: `Chương ${chapterNumber} của bộ truyện "${story.title}" của bạn đã được chấp nhận bởi quản trị viên.`,
          isRead: false,
        });
        const isSendToUsers =
          await this.sendNotificationToUsersSubscribedStoryId(
            storyId,
            story.title,
            chapterNumber
          );
        return {
          success: true,
          sendAuthor: isSendToAuthor,
          sendUsers: isSendToUsers,
        };
      } else {
        const isSendToAuthor = await Notification.create({
          userId: authorId,
          storyUrl: `${slugify(story.title)}-${story.id}`,
          image: story.image,
          content: `Chương ${chapterNumber} của bộ truyện "${story.title}" của bạn bị từ chối bởi quản trị viên.`,
          isRead: false,
        });
        return { success: true, sendAuthor: isSendToAuthor };
      }
    } catch (error) {
      console.log("error send notification to author by chapter", error);
      throw error;
    }
  },

  async sendNotificationToUsersSubscribedStoryId(
    storyId,
    title,
    chapterNumber
  ) {
    try {
      const users = await UserStory.findAll({
        where: {
          storyId: storyId,
          isSubcribe: true,
        },
      });
      if (users.length > 0) {
        const listNotifications = users.map((user) => {
          return {
            userId: user.userId,
            storyUrl: `${slugify(title)}-${storyId}`,
            content: `Bộ truyện "${title}" mà bạn đang theo dõi vừa cập nhật thêm chương ${chapterNumber}. Hãy thưởng thức nhé.`,
            isRead: false,
          };
        });
        const isSuccess = !!(await Notification.bulkCreate(listNotifications));
        return isSuccess;
      } else {
        return true;
      }
    } catch (error) {
      console.log(
        "error send notification to users subscribed story id",
        error
      );
      throw error;
    }
  },
};

export default NotificationService;
