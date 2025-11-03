import { Op } from "sequelize";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import client from "../config/redis.config.js";
import EmailService from "./email.service.js";

const AuthService = {
  async checkLogin(email, password) {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: String(email).toLowerCase() },
            { username: email },
          ],
        },
      });

      if (!user) {
        return false;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return false;
      }
      const { id, username, fullName, avatar, role } = user;

      return { id, username, fullName, avatar, role };
    } catch (error) {
      console.error("Error checking login:", error);
      return false;
    }
  },

  async signup(user) {
    try {
      user.email = user.email.toLowerCase();
      const existingUserName = await User.findOne({
        where: {
          [Op.or]: [{ username: user.username }],
        },
      });
      const existingEmail = await User.findOne({
        where: {
          [Op.or]: [{ email: user.email }],
        },
      });
      if (existingUserName || existingEmail) {
        return {
          result: false,
          isExistingUserName: existingUserName ? true : false,
          isExistingEmail: existingEmail ? true : false,
        };
      }
      const data = await EmailService.sendOTPToEmail(
        user.email,
        "Xác nhận đăng ký tài khoản"
      );
      if (!data.success) {
        return {
          result: false,
          message: data.message,
        };
      }
      return {
        result: true,
        message: data.message,
      };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async signupdata(user) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await User.create({ ...user, role: "user" });
      const { id, username, fullName, avatar, role } = newUser;
      return { id, username, fullName, avatar, role };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async adminSignup(user) {
    try {
      user.email = user.email.toLowerCase();
      const existingUserName = await User.findOne({
        where: {
          [Op.or]: [{ username: user.username }],
        },
      });
      const existingEmail = await User.findOne({
        where: {
          [Op.or]: [{ email: user.email }],
        },
      });
      if (existingUserName || existingEmail) {
        return {
          result: false,
          isExistingUserName: existingUserName ? true : false,
          isExistingEmail: existingEmail ? true : false,
        };
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await User.create({ ...user, role: "admin" });
      const { id, username, fullName, avatar, role } = newUser;
      return { id, username, fullName, avatar, role };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async forgetPassword(email) {
    try {
      const user = await User.findOne({
        where: { email: String(email).toLowerCase() },
      });
      if (!user) {
        return { result: false };
      }
      const OTP = String(Math.floor(100000 + Math.random() * 900000));
      const hashOTP = bcrypt.hash(OTP, 10);
      return { result: true, OTP: OTP, hashOTP: hashOTP };
    } catch (error) {
      console.error("Error forgot password:", error);
      throw error;
    }
  },

  async verifyOTP(email, otp) {
    try {
      const hashOTPSaved = await client.get(`otp:${email}`);
      if (!hashOTPSaved) {
        return { success: false, message: "OTP hết hạn hoặc không tồn tại" };
      }

      const isMatch = await bcrypt.compare(otp, hashOTPSaved);
      if (!isMatch) {
        return { success: false, message: "OTP không đúng. Vui lòng thử lại." };
      }
      await client.del(`otp:${email}`);

      return { success: true, message: "Xác minh OTP thành công." };
    } catch (error) {
      console.error("Error verify otp:", error);
      throw error;
    }
  },

  async changePassword(email, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(
        { password: hashedPassword },
        { where: { email: String(email).toLowerCase() } }
      );
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },

  async getAdminInfor(id) {
    try {
      const user = await User.findOne({ where: { id: id, role: "admin" } });
      return user;
    } catch (error) {
      console.error("Error getting admin infor:", error);
      throw error;
    }
  },
};

export default AuthService;
