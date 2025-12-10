import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

const checkChangeToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next();
  }

  const id = req.headers["userid"];

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(403).json({ message: "Invalid token or token changed!" });
      }
      return next();
    });
  } catch (error) {
    console.error("Redis error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during token check." });
  }
};

export default checkChangeToken;
