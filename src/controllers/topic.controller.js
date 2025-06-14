import TopicService from "../services/topic.service.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await TopicService.getAllTopics();
    res.status(200).json({
      success: true,
      message: "Get all topics successfully",
      topics: topics,
    });
  } catch (error) {
    console.error("Error get all topics:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all topics! ${error}.`,
    });
  }
};

export const createTopic = async (req, res) => {
  try {
    const topic = await TopicService.createTopic(req.body);
    res.status(200).json({
      success: true,
      message: "Create topic successfully",
      topic: topic,
    });
  } catch (error) {
    console.error("Error create topic:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during create topic! ${error}.`,
    });
  }
};
