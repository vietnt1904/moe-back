import { ReasonUpdate } from "../models/reasonUpdate.model.js";

const ReasonUpdateService = {
  async createReasonUpdate(storyId, status, reason) {
    try {
      const updatedReason = await ReasonUpdate.create({storyId, status, reason});
      return updatedReason;
    } catch (error) {
      console.log("Error createReasonUpdate: ", error?.message);
      throw error;
    }
  },
};

export default ReasonUpdateService;
