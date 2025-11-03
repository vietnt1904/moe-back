import client from "../config/redis.config.js";

const checkChangeToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return next(); 
  }
  
  const id = req.headers['userid'];

  try {
    const oldToken = await client.get("IdAndToken" + id);
    
    if (oldToken && token !== oldToken) {
      return res.status(401).json({ message: "Unauthorized: Token mismatch or invalidated!" });
    }

    return next();

  } catch (error) {
    console.error("Redis error:", error);
    return res.status(500).json({ message: "Internal server error during token check." });
  }
};

export default checkChangeToken;