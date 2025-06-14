import express from "express";
import { sendEmail } from "../controllers/email.controller.js";
import { sendBulkEmail } from "../controllers/email.controller.js";
const emailRouter = express.Router();

emailRouter.post("/send-email", sendEmail);
emailRouter.post("/send-bulk-email", sendBulkEmail);
export default emailRouter;
