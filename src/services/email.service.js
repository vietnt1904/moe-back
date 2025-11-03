//// import cron from "node-cron";
import bcrypt from "bcrypt";

import nodemailer from "nodemailer";
import client from "../config/redis.config.js";
import { createOTP } from "../utils/index.js";
import pLimit from "p-limit";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Hoặc 587 nếu không dùng SSL
  secure: true, // true cho port 465, false cho 587
  auth: {
    user: "medegany45@gmail.com",
    pass: "caaq tiys wutm tkwt",
  },
});

const EmailService = {
  async sendMailToUser(sendTo, subject, message) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: sendTo,
        subject: subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email đã được gửi thành công." };
    } catch (error) {
      console.error("Lỗi gửi email:", error);
      throw new Error("Không thể gửi email, vui lòng thử lại.");
    }
  },

  async sendOTPToEmail(sendTo, subject) {
    try {
      const OTP = createOTP();
      const hashOTP = await bcrypt.hash(OTP, 10);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: sendTo,
        subject: subject,
        text: `Mã OTP của bạn là <strong>${OTP}</strong>. Mã OTP có hiệu lực trong 5 phút.`,
      };
      await client.del(`otp:${sendTo}`);

      await client.set(`otp:${sendTo}`, hashOTP, {
        EX: 300, // TTL 300 giây
      });

      const isSuccess = await transporter.sendMail(mailOptions);
      if (isSuccess) {
        return { success: true, message: "Email đã được gửi thành công." };
      } else {
        return {
          success: false,
          message: "Gửi email không thành công, vui lòng thử lại.",
        };
      }
    } catch (error) {
      console.error("Lỗi gửi email:", error);
      throw new Error("Không thể gửi email, vui lòng thử lại.");
    }
  },

  async sendMailToListUsers(listUser, subject, message) {
    // Update message
    const limit = pLimit(10);
    try {
      const tasks = listUser?.map((email) => {
        limit(() => {
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
          });
        });
      });

      const results = await Promise.allSettled(tasks);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`Gửi mail cho ${listUser[index]} thành công.`);
        } else {
          console.log(`Gửi mail cho ${listUser[index]} lỗi:`, result.reason);
        }
      });
    } catch (error) {
      console.log("Lỗi gửi email", error);
      throw error;
    }
  },
};

export default EmailService;
