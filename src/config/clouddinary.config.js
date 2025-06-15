import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "./config.js";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "jpeg", "png"],
    params: {
        folder: "moe_db_images",
    },
});

const uploadCloud = multer({ storage });
export default uploadCloud;
