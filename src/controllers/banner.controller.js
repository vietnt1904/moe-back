import client from "../config/redis.config.js";
import BannerService from "../services/banner.service.js";

export const getAdminBanners = async (req, res) => {
  try {
    const {page, limit} = req.query;
    const offset = (page - 1) * limit;
    let banners = null;
    banners = await client.get("adminBanners");
    if (banners !== null) {
      return res.status(200).json({
        success: true,
        message: "Get admin banner successfully",
        data: JSON.parse(banners),
      });
    }
    banners = await BannerService.getAdminBanners(offset, Number(limit)) || [];
    await client.set("adminBanners", JSON.stringify(banners), { EX: 300 });
    return res
      .status(200)
      .json({
        success: true,
        message: "Get admin banner successfully",
        data: banners,
      });
  } catch (error) {
    console.error("Error get admin banner:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get admin banner! ${error}.`,
    });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    let banners = null;
    banners = await client.get("allBanners");
    if (banners !== null) {
      return res.status(200).json({
        success: true,
        message: "Get all banner successfully",
        data: JSON.parse(banners) || [],
      });
    }
    banners = await BannerService.getBanners() || [];
    await client.set("allBanners", JSON.stringify(banners), { EX: 300 });
    return res
      .status(200)
      .json({ success: true, message: "Get all banner successfully", data: banners });
  } catch (error) {
    console.error("Error get all banner:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get all banner! ${error}.`,
    });
  }
};

export const addBanner = async (req, res) => {
  try {
    const banner = await BannerService.addBanner(req.body);
    await client.del("allBanners");
    await client.del("adminBanners");
    return res
      .status(200)
      .json({ success: true, message: "Add banner successfully", data: banner });
  } catch (error) {
    console.error("Error add banner:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during add banner! ${error}.`,
    });
  }
};

export const updateBannerStatus = async (req, res) => {
  try {
    const banner = await BannerService.updateBannerStatus(req.params.id, req.body?.status);
    await client.del("allBanners");
    await client.del("adminBanners");
    return res
      .status(200)
      .json({ success: true, message: "Update banner successfully", data: banner });
  } catch (error) {
    console.error("Error update banner:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update banner! ${error}.`,
    });
  }
};

export const updateBannerData = async (req, res) => {
  try {
    const { name, image, startDate, endDate } = req.body;
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Start date must be less than end date",
      });
    }
    const banner = await BannerService.updateBannerData(req.params.id, name, image, startDate, endDate);
    await client.del("allBanners");
    await client.del("adminBanners");
    return res
      .status(200)
      .json({ success: true, message: "Update banner successfully", data: banner });
  } catch (error) {
    console.error("Error update banner:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update banner! ${error}.`,
    });
  }
};

export const stopAllBanners = async (req, res) => {
  try {
    const banner = await BannerService.stopAllBanners();
    await client.del("allBanners");
    await client.del("adminBanners");
    return res
      .status(200)
      .json({ success: true, message: "Stop all banner successfully", data: banner });
  } catch (error) {
    console.error("Error stop all banner:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during stop all banner! ${error}.`,
    });
  }
};
