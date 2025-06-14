import { Op } from "sequelize";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const AuthService = {
  async checkLogin(email, password) {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { username: email }],
        },
      });

      if (!user) {
        return false;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return false;
      }
      const { id, username, fullName, avatar, role, spiritStones } = user;

      return { id, username, fullName, avatar, role, spiritStones };
    } catch (error) {
      console.error("Error checking login:", error);
      return false;
    }
  },

  async signup(user) {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email: user.email }, { username: user.username }],
        },
      });
      if (existingUser) {
        return false;
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await User.create({ ...user, role: "user" });
      const { id, username, fullName, avatar, role, spiritStones } = newUser;
      return { id, username, fullName, avatar, role, spiritStones };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async adminSignup(user) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await User.create({ ...user, role: "admin" });
      const { id, username, fullName, avatar, role, spiritStones } = newUser;
      return { id, username, fullName, avatar, role, spiritStones };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async forgotPassword(email) {
    // chưa hoàn thiện
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return false;
      }
      // Gửi email xác nhận đổi mật khẩu cho người dùng
      // Gửi mật khẩu mới cho người dùng
    } catch (error) {
      console.error("Error forgot password:", error);
      throw error;
    }
  },

  async changePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(
        { password: hashedPassword },
        { where: { id: userId } }
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
