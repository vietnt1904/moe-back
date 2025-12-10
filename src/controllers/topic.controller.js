import TopicService from "../services/topic.service.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await TopicService.getAllTopics();
    return res.status(200).json({
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

export const getAdminTopics = async (req, res) => {
  try {
    const topics = await TopicService.getAdminTopics();
    return res.status(200).json({
      success: true,
      message: "Get admin topics successfully",
      topics: topics,
    });
  } catch (error) {
    console.error("Error get admin topics:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get admin topics! ${error}.`,
    });
  }
};

export const createTopic = async (req, res) => {
  try {
    const topic = await TopicService.createTopic(req.body);
    if (topic?.success) {
      return res.status(200).json({
        success: true,
        message: "Create topic successfully",
        topic: topic?.data,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: topic?.message,
      });
    }
  } catch (error) {
    console.error("Error create topic:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during create topic! ${error}.`,
    });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await TopicService.updateTopic(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Update topic successfully",
      data: topic,
    });
  } catch (error) {
    console.error("Error update topic:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update topic! ${error}.`,
    });
  }
};
