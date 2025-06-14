import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

//next:call when token is valid -> go to next middleware -> next request handler
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized!",
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            }
            return res.status(403).json({ message: "Invalid token!" });
        }
        req.user = decoded;
        next();
    });
};

export default verifyToken;
