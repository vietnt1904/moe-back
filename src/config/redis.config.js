import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',  // Ép dùng IPv4 thay vì 'localhost'
    port: Number(process.env.REDIS_PORT) || 6379, // Đảm bảo port là số
  }
});

client.on('error', err => console.error('Redis Client Error', err));

await client.connect().catch(console.error);

export default client;
