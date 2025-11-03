import { Rate } from "../models/rate.model.js";
import { Story } from "../models/story.model.js";

const RateService = {
  async getRatesByStoryId(id) {
    try {
      const rates = await Rate.findAll({ where: { storyId: id } });
      return rates;
    } catch (error) {
      console.error("Error get rate by story:", error);
      throw error;
    }
  },

  async getRatesByUserId(id) {
    try {
      const rates = await Rate.findAll({ where: { userId: id } });
      return rates;
    } catch (error) {
      console.error("Error get rate by user:", error);
      throw error;
    }
  },

  async addRateByUserId(data) {
    try {
      const rate = await Rate.create(data);
      await Story.increment(
        { star: data?.star, rating: 1 },
        { where: { id: data?.storyId } }
      );
      return rate;
    } catch (error) {
      console.error("Error add rate by user:", error);
      throw error;
    }
  },
};

export default RateService;
