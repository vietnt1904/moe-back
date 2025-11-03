import { Topic } from "../models/topic.model.js";

const TopicService = {
  async getAllTopics() {
    try {
      const topics = await Topic.findAll({ where: { isActive: true } });
      return topics;
    } catch (error) {
      console.error("Error get all topics:", error);
      throw error;
    }
  },

  async getAdminTopics() {
    try {
      const topics = await Topic.findAll();
      return topics;
    } catch (error) {
      console.error("Error get admin topics:", error);
      throw error;
    }
  },

  async createTopic(topic) {
    try {
      const isExit = await Topic.findOne({ where: { name: topic.name } });
      if (isExit) {
        return {
          success: false,
          message: "Tên chủ đề đã tồn tại. Hãy thử lại!",
        };
      }
      const newTopic = await Topic.create(topic);

      return { success: true, data: newTopic };
    } catch (error) {
      console.error("Error create topic:", error);
      throw error;
    }
  },

  async updateTopic(id, topic) {
    try {
      const updateTopic = await Topic.update(topic, { where: { id } });
      return updateTopic > 0 ? true : false;
    } catch (error) {
      console.error("Error update topic:", error);
      throw error;
    }
  },
};

export default TopicService;
