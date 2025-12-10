import AuthService from "../services/auth.service.js";
import NotificationService from "../services/notification.service.js";
import StoryService from "../services/story.service.js";
import userService from "../services/user.service.js";
import UserStoryService from "../services/userStory.service.js";
import { getIdTitleFromUrl } from "../utils/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const { page, limit, name, phone, email, username } = req.query;
    const user = await userService.getAllUsers(
      page,
      limit,
      name,
      phone,
      email,
      username
    );
    return res.status(200).json({
      success: true,
      message: "Get user successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error get user:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get user! ${error}.`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json({
      success: true,
      message: "Get user by ID successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error get user by ID:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get user by ID! ${error}.`,
    });
  }
};

export const updateUserInformation = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.updateUserInformation(id, req.body);
    if (user?.success === false)
      return res.status(200).json({ success: false, message: user.message });

    return res.status(200).json({
      success: true,
      message: "Update user information successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error update user information:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update user information! ${error}.`,
    });
  }
};

export const getHistoryByUserId = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const stories = await UserStoryService.getAllReadStoriesByUserId(userId);
    return res.status(200).json({
      success: true,
      data: stories,
      message: "Get user history success",
    });
  } catch (err) {
    console.log("Error get user history", err);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get user history: ${err}`,
    });
  }
};

export const getSavedStoryByUserId = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const stories = await UserStoryService.getSavedStoryByUserId(userId);
    return res.status(200).json({
      success: true,
      data: stories,
      message: "get saved story success",
    });
  } catch (error) {
    console.log("error get saved story", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get user saved story`,
    });
  }
};

export const checkSaved = async (req, res) => {
  try {
    const { userId, storyId } = req.query;
    const user = await UserStoryService.checkSaved(userId, storyId);
    return res.status(200).json({
      success: true,
      message: "Check saved story successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error check saved story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during check saved story! ${error}.`,
    });
  }
};

export const updateSaveStory = async (req, res) => {
  try {
    const { userId, storyId, isSave } = req.body;
    const data = await UserStoryService.updateIsSaveStory(
      userId,
      storyId,
      isSave
    );
    return res.status(200).json({
      success: true,
      message: "Update save story successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error update save story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update save story! ${error}.`,
    });
  }
};

export const addStoryToHistory = async (req, res) => {
  try {
    const { userId, storyId, lastChapter } = req.body;
    const user = await UserStoryService.addUserStory(
      userId,
      storyId,
      lastChapter
    );
    return res.status(200).json({
      success: true,
      message: "Save history of user successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error save history of user:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during save history of user! ${error}.`,
    });
  }
};

export const saveHistoryOfUser = async (req, res) => {
  try {
    const { userId, storyId, lastChapter } = req.body;
    console.log("--------------------------, saveHistoryOfUser");
    
    const user = await UserStoryService.addUserStory(
      userId,
      storyId,
      lastChapter,
      (isFinish = false),
      (isSave = true)
    );
    return res.status(200).json({
      success: true,
      message: "Save history of user successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error save history of user:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during save history of user! ${error}.`,
    });
  }
};

export const checkUserPaidStory = async (req, res) => {
  try {
    const { userId, storyId } = req.query;
    const user = await UserStoryService.checkUserPaidStory(userId, storyId);
    return res.status(200).json({
      success: true,
      message: "Check user paid story successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error check user paid story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during check user paid story! ${error}.`,
    });
  }
};

export const userBuyStory = async (req, res) => {
  try {
    const { userId, storyId, spiritStones } = req.body;
    const user = await UserStoryService.userBuyStory(userId, storyId, spiritStones);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User buy story successfully",
        data: user,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "User buy story failed",
      });
    }
  } catch (error) {
    console.error("Error user buy story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during user buy story! ${error}.`,
    });
  }
};

export const getFollowersOfAuthor = async (req, res) => {
  try {
    const { id: authorId } = req.params;
    const followers = await userService.getFollowersOfAuthor(authorId);
    return res.status(200).json({
      success: true,
      message: "Get followers of author successfully",
      data: followers,
    });
  } catch (error) {
    console.log("error get followers of author", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get followers of author. ${error}`,
    });
  }
};

export const getAllStoriesOfAuthor = async (req, res) => {
  try {
    const { id: authorId } = req.params;
    const stories = await StoryService.getAllStoriesOfAuthor(Number(authorId));
    return res.status(200).json({
      success: true,
      message: "Get all stories of author successfully",
      data: stories,
    });
  } catch (error) {
    console.log("error get all stories of author", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get all stories of author. ${error}`,
    });
  }
};

export const getStoryByIdOfAuthor = async (req, res) => {
  try {
    const { title } = req.params;
    const { id, slug } = getIdTitleFromUrl(title);
    const story = await StoryService.getStoryByIdOfAuthor(id, slug);
    return res.status(200).json({
      success: true,
      message: "Get story by ID of author successfully",
      data: story,
    });
  } catch (error) {
    console.log("error get story by ID of author", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get story by ID of author. ${error}`,
    });
  }
};

export const getUserSubscribeStories = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const stories = await UserStoryService.getUserSubscribeStories(userId);
    return res.status(200).json({
      success: true,
      message: "Get user subscribe stories successfully",
      data: stories,
    });
  } catch (error) {
    console.log("error get user subscribe stories", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get user subscribe stories. ${error}`,
    });
  }
};

export const getUserSubscribeStoriesOfAuthor = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { authorId: authorId } = req.query;
    const stories = await StoryService.getUserSubscribeStoriesOfAuthor(
      userId,
      authorId
    );
    return res.status(200).json({
      success: true,
      message: "Get user subscribe stories of author successfully",
      data: stories,
    });
  } catch (error) {
    console.log("error get user subscribe stories of author", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get user subscribe stories of author. ${error}`,
    });
  }
};

export const userSubscribeAuthor = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { authorId: authorId, isSubscribe: isSubscribe } = req.body;
    const user = await userService.userSubscribeAuthor(userId, authorId, isSubscribe );
    return res.status(200).json({
      success: true,
      message: "User subscribe author successfully",
      data: user,
    });
  } catch (error) {
    console.log("error user subscribe author", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when user subscribe author. ${error}`,
    });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const notifications = await NotificationService.getAllNotifications(userId);
    return res.status(200).json({
      success: true,
      message: "Get all notifications successfully",
      data: notifications,
    });
  } catch (error) {
    console.log("error get all notifications", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get all notifications. ${error}`,
    });
  }
};

export const getUnreadNotifications = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const notifications = await NotificationService.getUnreadNotifications(
      userId
    );
    return res.status(200).json({
      success: true,
      message: "Get unread notifications successfully",
      data: notifications,
    });
  } catch (error) {
    console.log("error get unread notifications", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when get unread notifications. ${error}`,
    });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { id: notificationId } = req.params;
    const { isRead } = req.body;
    const notification = await NotificationService.updateNotification(
      notificationId,
      isRead
    );
    return res.status(200).json({
      success: true,
      message: "Update notification successfully",
      data: notification,
    });
  } catch (error) {
    console.log("error update notification", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when update notification. ${error}`,
    });
  }
};

export const updateAllNotifications = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const notifications = await NotificationService.updateAllNotifications(
      userId
    );
    return res.status(200).json({
      success: true,
      message: "Update all notifications successfully",
      data: notifications,
    });
  } catch (error) {
    console.log("error update all notifications", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred when update all notifications. ${error}`,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const data = await userService.changePassword(email, password, newPassword);
    return res.status(200).json({
      success: data?.success,
      message: data.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during reset password! ${error}.`,
    });
  }
};

//  ==================== ADMIN ===================

export const updateUserByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { spiritStones } = req.body;
    const user = await userService.updateUserStones(id, spiritStones);
    return res.status(200).json({
      success: true,
      message: "Update user by ID successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error update user by ID:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update user by ID! ${error}.`,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await userService.updateUserRole(id, role);
    if (user?.success === false) {
      return res.status(200).json({ success: false, message: user?.message });
    }
    return res.status(200).json({
      success: true,
      message: "Thay đổi vai trò người dùng thành công.",
      user: user,
    });
  } catch (error) {
    console.error("Error update user role:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update user role! ${error}.`,
    });
  }
};
