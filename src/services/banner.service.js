import { Op } from "sequelize";
import { Banner } from "../models/banner.model.js";

const BannerService = {
  async getAdminBanners(offset = 0, limit = 20) {
    try {
      const banner = await Banner.findAll({ limit: limit, offset: offset });
      const count = await Banner.count();
      return { banners: banner, total: count };
    } catch (error) {
      console.error("Error get banner:", error);
      throw error;
    }
  },

  async getBanners() {
    try {
      const banner = await Banner.findAll({
        where: {
          isActive: true,
          startDate: { [Op.lte]: new Date() },
          endDate: { [Op.gte]: new Date() },
        },
      });
      return banner;
    } catch (error) {
      console.error("Error get banner:", error);
      throw error;
    }
  },

  async getBannerById(id) {
    try {
      const banner = await Banner.findOne({ where: { id: id } });
      return banner;
    } catch (error) {
      console.error("Error get banner by ID:", error);
      throw error;
    }
  },

  async addBanner(banner) {
    try {
      const newBanner = await Banner.create(banner);
      return newBanner;
    } catch (error) {
      console.error("Error add banner:", error);
      throw error;
    }
  },

  async updateBannerStatus(id, status) {
    try {
      const updatedBanner = await Banner.update(
        { isActive: status },
        { where: { id: id } }
      );
      return updatedBanner > 0 ? true : false;
    } catch (error) {
      console.error("Error update banner:", error);
      throw error;
    }
  },

  async updateBannerData(id, name, image, startDate, endDate) {
    try {
      const updatedBanner = await Banner.update(
        { startDate: startDate, endDate: endDate, name: name, image: image },
        { where: { id: id } }
      );
      return updatedBanner > 0 ? true : false;
    } catch (error) {
      console.error("Error update banner:", error);
      throw error;
    }
  },

  async stopAllBanners() {
    try {
      const updatedBanner = await Banner.update({ isActive: false }, { where: {} });
      return updatedBanner > 0 ? true : false;
    } catch (error) {
      console.error("Error stop all banner:", error);
      throw error;
    }
  },
};

export default BannerService;
