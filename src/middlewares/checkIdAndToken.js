import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

const checkIdAndToken = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized! No token" });
  }
  const decoded = await jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token!" });
    }
    if (decoded.id !== Number(id)) {
      return res.status(401).json({ message: "Unauthorized! Id not match" });
    }
    return decoded;
  });
  if (!decoded?.id) {
    return res.status(401).json({ message: "Unauthorized! Token is invalid" });
  }
  return next();
};

export default checkIdAndToken;