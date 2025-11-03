import client from "../config/redis.config.js";

const checkIdAndToken = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  const oldToken = await client.get("IdAndToken" + id);
  if (token !== oldToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  next();
};

export default checkIdAndToken;