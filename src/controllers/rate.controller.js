import RateService from "../services/rate.service.js";

export const getRatesByStoryId = (req, res) => {
  try {
    const { id } = req.params;
    const rates = RateService.getRatesByStoryId(id);
    return res.status(200).json({
      success: true,
      message: "Get rates by story successfully",
      data: rates,
    });
  } catch (error) {
    console.error("Error get rate by story:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get rate by story! ${error}.`,
    });
  }
};

export const getRatesByUserId = (req, res) => {
  try {
    const { id } = req.params;
    const rates = RateService.getRatesByUserId(id);
    return res.status(200).json({
      success: true,
      message: "Get rates by user successfully",
      data: rates,
    });
  } catch (error) {
    console.error("Error get rate by user:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get rate by user! ${error}.`,
    });
  }
};

export const addRateByUserId = (req, res) => {
  try {
    const rate = RateService.addRateByUserId(req.body);
    return res.status(200).json({
      success: true,
      message: "Add rate by user successfully",
      data: rate,
    });
  } catch (error) {
    console.error("Error add rate by user:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during add rate by user! ${error}.`,
    });
  }
};
