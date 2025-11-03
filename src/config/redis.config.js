import { createClient } from "redis";
import {
  REDIS_NAME,
  REDIS_PASSWORD,
  SOCKET_HOST,
  SOCKET_PORT,
} from "./config.js";

const client = createClient({
  username: REDIS_NAME,
  password: REDIS_PASSWORD,
  socket: {
    host: SOCKET_HOST,
    port: Number(SOCKET_PORT) || 19109, // Đảm bảo port là số
  },
});

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect().catch(console.error);

export default client;
