import { Op, Sequelize } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { User } from "../models/user.model.js";
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
    async getUserById(id) {
        const user = await User.findOne({ where: { id: id } });
        return user;
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
                },
            );

            const updatedUser = await userService.getUserById(id);
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateUserInformation(id, user) {
        try {
            const updatedUser = await User.update(user, { where: { id: id } });
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default userService;
