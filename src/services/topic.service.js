import { Topic } from "../models/topic.model.js";

const TopicService = {
    async getAllTopics() {
        try {
            const topics = await Topic.findAll();
            return topics;
        } catch (error) {
            console.error("Error get all topics:", error);
            throw error;
        }
    },

    async createTopic(topic) {
        try {
            const newTopic = await Topic.create(topic);
            return newTopic;
        } catch (error) {
            console.error("Error create topic:", error);
            throw error;
        }
    },
};

export default TopicService;