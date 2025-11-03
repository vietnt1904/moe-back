import { JWT_SECRET } from "../config/config.js";
import AuthService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import EmailService from "../services/email.service.js";
import client from "../config/redis.config.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.checkLogin(email, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "30Days" }
    );
    await client.set("IdAndToken" + user.id, token, {EX: 30 * 24 * 60 * 60});
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during login! ${error}.`,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.checkLogin(email, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "You are not admin",
      });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during login! ${error}.`,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const user = await AuthService.signup(req.body);
    if (!user?.result) {
      let message = "Signup failed. ";
      if (user.isExistingEmail && !user.isExistingUserName) {
        message += "Email already exists.";
      } else if (user.isExistingUserName && !user.isExistingEmail) {
        message += "Username already exists.";
      } else if (user.isExistingEmail && user.isExistingUserName) {
        message += "Email and username already exists.";
      } else {
        message += "Send email false. Please try again.";
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Signup successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Signup failed ${error?.message}`,
      error: `An error occurred during signup! ${error}.`,
    });
  }
};

export const signupdata = async (req, res) => {
  try {
    const user = await AuthService.signupdata(req.body);
    return res.status(200).json({
      success: true,
      message: "Signup successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during signup! ${error}.`,
    });
  }
};

export const adminSignup = async (req, res) => {
  // try {
  //   const user = await AuthService.adminSignup(req.body);
  //   return res.status(200).json({
  //     success: true,
  //     message: "Signup successfully",
  //     user: user,
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     error: `An error occurred during signup! ${error}.`,
  //   });
  // }
  return res.status(501).json({
    success: false,
    message: "No register admin account",
  });
};

export const getSession = (req, res) => {
  res.status(200).json({
    message: "Authenticated!",
  });
};

export const getAdminInfor = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthService.getAdminInfor(Number.parseInt(id));
    return res.status(200).json({
      success: true,
      message: "Get admin infor successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during get admin infor! ${error}.`,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await AuthService.forgetPassword(email);
    if (!data?.result) {
      return res.status(200).json({
        success: false,
        message: "Cannot find email. Please try again.",
      });
    }
    const messageToSend = `Mã xác nhận của bạn là: ${data?.OTP}`;
    const sendMail = await EmailService.sendOTPToEmail(
      email,
      "Reset your password"
    );
    if (!sendMail?.success) {
      return res.status(200).json({
        success: false,
        message: "Cannot send email. Please try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Send OTP successfully. Please check your email.",
      data: data?.OTP,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during reset password! ${error}.`,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = await AuthService.verifyOTP(email, otp);
    return res.status(200).json({
      success: data?.success,
      message: data?.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during verify OTP! ${error}.`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.changePassword(email, password);
    return res.status(200).json({
      success: true,
      message: "Reset password successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `An error occurred during reset password! ${error}.`,
    });
  }
};

export const checkOTP = async (email, otp) => {
  try {
    const data = await AuthService.verifyOTP(email, otp);
    return data;
  } catch (error) {
    throw error;
  }
};
