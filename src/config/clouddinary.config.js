import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "./config.js";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: "dl4podtgy",
    api_key: "993843185934453",
    api_secret: "FVK2TS5FRzkFO2Z2zFrsyiwFHfs",
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
