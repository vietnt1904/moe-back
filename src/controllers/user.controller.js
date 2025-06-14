import userService from "../services/user.service.js";

export const getAllUsers = async(req, res) => {
    try {
        const { page, limit, name, phone, email, username } = req.query;
        const user = await userService.getAllUsers(page, limit, name, phone, email, username);
        return res.status(200).json({
            success: true,
            message: "Get user successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error get user:", error);
        return res.status(500).json({
            success: false,
            error: `An error occurred during get user! ${error}.`,
        });
    }
};

export const getUserById = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json({
            success: true,
            message: "Get user by ID successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error get user by ID:", error);
        return res.status(500).json({
            success: false,
            error: `An error occurred during get user by ID! ${error}.`,
        });
    }
};

export const updateUserInformation = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.updateUserInformation(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update user information successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error update user information:", error);
        return res.status(500).json({
            success: false,
            error: `An error occurred during update user information! ${error}.`,
        });
    }
}

export const updateUserByIdAdmin = async(req, res) => {
    try {
        const { id } = req.params;
        const {spiritStones} = req.body;
        const user = await userService.updateUserStones(id, spiritStones);
        return res.status(200).json({
            success: true,
            message: "Update user by ID successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error update user by ID:", error);
        return res.status(500).json({
            success: false,
            error: `An error occurred during update user by ID! ${error}.`,
        });
    }
};