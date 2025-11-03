import { Op, Sequelize } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { User } from "../models/user.model.js";
import { UserAuthor } from "../models/userAuthor.model.js";
import bcrypt from "bcrypt";
import { changePassword, userSubscribeAuthor } from "../controllers/user.controller.js";
const userService = {
  async getAllUsers(page, limit, name, phone, email, username) {
    try {
      const offset = (page - 1) * limit;
      const whereCondition = {};
      if (name) {
        whereCondition.fullName = { [Op.like]: `%${name}%` }; // Tìm kiếm theo tên
      }

      if (phone) {
        whereCondition.phoneNumber = { [Op.like]: `%${phone}%` }; // Tìm kiếm theo SĐT
      }

      if (email) {
        whereCondition.email = email;
      }

      if (username) {
        whereCondition.username = username;
      }

      const response = await User.findAll({
        where: whereCondition,
        limit: Number(limit),
        offset: Number(offset),
      });

      // tinh total page
      const totalRecords = await User.count({ where: whereCondition });
      const totalPages = Math.ceil(totalRecords / limit);

      return {
        users: response,
        totalPages: totalPages,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getUserById(uId) {
    const user = await User.findOne({ where: { id: uId } });
    const {avatar, backgroundImage, createdAt, dob, email, fullName, id, phoneNumber, role, spiritStones, updatedAt, username} = user;
    return {avatar, backgroundImage, createdAt, dob, email, fullName, id, phoneNumber, role, spiritStones, updatedAt, username};
  },
  async updateUserStones(id, spiritStones) {
    try {
      const user = await User.findOne({ where: { id: id } });

      if (!user) {
        return false;
      }

      const newSpiritStones = user.spiritStones + spiritStones;
      await User.update(
        { spiritStones: newSpiritStones },
        {
          where: { id: id },
        }
      );

      const updatedUser = await userService.getUserById(id);
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getFollowersOfAuthor(authorId) {
    try {
      const followers = await UserAuthor.findAll({
        attributes: [],
        include: {
          model: User,
          as: "User",
          attributes: ["id", "username", "fullName", "avatar"],
        },
        where: { authorId: authorId, isSubscribe: true },
      });
      const follow = await UserAuthor.findAll({
        attributes: [],
        include: {
          model: User,
          as: "User",
          attributes: ["id", "username", "fullName", "avatar"],
        },
        where: { userId: authorId, isSubscribe: true },
      });
      return { followers: followers, follow: follow };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async userSubscribeAuthor(userId, authorId, isSubscribe) {
    try {
      const isExit = await UserAuthor.findOne({
        where: {
          userId: userId,
          authorId: authorId,
        },
      })
      if (isExit) {
        const isUpdated = await UserAuthor.update(
          { isSubscribe: isSubscribe },
          {
            where: { userId: userId, authorId: authorId },
          }
        );
        return isUpdated > 0;
      }
      const subscribe = await UserAuthor.create({
        userId: userId,
        authorId: authorId,
        isSubscribe: true,
      });
      return subscribe;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUserRole(id, role) {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return { success: false, message: "Không tìm thấy người dùng" };
      }
      if (
        user.email === "quangminhnguyen041202@gmail.com" ||
        user.email === "medegany45@gmail.com"
      ) {
        return {
          success: false,
          message: "Tài khoản này là admin, không thể thay đổi.",
        };
      }
      await User.update({ role: role }, { where: { id: id } });
      const updatedUser = await userService.getUserById(id);
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUserInformation(id, user) {
    try {
      const {
        avatar,
        backgroundImage,
        dob,
        fullName,
        password,
        newPassword,
        username,
        email,
      } = user;
      const isExit = await User.findOne({ where: { id: id, email: email } });

      if (!isExit) {
        return { success: false, message: "Người dùng không tồn tại." };
      }
      if (password) {
        const isRightPassword = await bcrypt.compare(password, isExit.password);
        if (!isRightPassword) {
          return {
            success: false,
            message: "Mật khẩu hiện tại không chính xác. Vui lòng thử lại.",
          };
        }
      }
      let hashedPassword = isExit.password;
      if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await User.update(
        {
          avatar,
          backgroundImage,
          dob,
          fullName,
          hashedPassword,
          username,
          email,
        },
        { where: { id: id } }
      );
      const newUser = await User.findOne({ where: { id: id } });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async changePassword(email, password, newPassword) {
    try {
      const isExit = await User.findOne({
        where: {
          email: String(email).toLowerCase(),
        },
      });
      if (!isExit) {
        return { success: false, message: "Người dùng không tồn tại." };
      }
      const isRightPassword = await bcrypt.compare(password, isExit.password);
      if (!isRightPassword) {
        return {
          success: false,
          message: "Mật khẩu hiện tại không chính xác. Vui số thử lại.",
        };
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(
        { password: hashedPassword },
        { where: { email: String(email).toLowerCase() } }
      );
      return {
        success: true,
        message: "Cập nhật mật khẩu thành công.",
      };
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};

export default userService;
