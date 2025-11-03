import dotenv from "dotenv";
dotenv.config();

// DB config

export const DATABASE = process.env.DATABASE || "moe_db";
export const USERNAME = "postgres";
export const PASSWORD = "123456";
export const DIALECT = process.env.DIALECT || "postgres";
export const DBHOST = process.env.DBHOST || "localhost";
export const EMAIL_NAME = process.env.EMAIL_NAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET || "secret"
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
export const HOST = process.env.HOST || "0.0.0.0";
export const PORT = process.env.PORT || 3050;
export const RENDER_DB_URL = process.env.RENDER_DB_URL;
export const REDIS_NAME = process.env.REDIS_NAME;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const SOCKET_HOST = process.env.SOCKET_HOST;
export const SOCKET_PORT = process.env.SOCKET_PORT;
