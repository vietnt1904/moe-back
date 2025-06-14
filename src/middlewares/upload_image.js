import uploadCloud from "../config/clouddinary.config.js";

// Middleware upload một file ảnh
export const uploadAvatar = (req, res, next) => {
  uploadCloud.single("image")(req, res, function (err) {
    if (err) {
      console.error("Upload lỗi:", err);
      return res.status(400).json({ error: "Lỗi upload ảnh ", errorDetail: err.message });
    }

    if (req.body.keep_image === "true") {
      return next();
    }

    if (!req.file) {
      return res.status(400).json({ error: "Chưa có ảnh được gửi lên" });
    }

    req.body.image = req.file.path;

    // Nếu upload thành công => gọi next()
    next();
  });
};

export const uploadAvatarAndBackground = (req, res, next) => {
  // Cho phép upload 2 trường ảnh: 'avatar' và 'backgroundImage'
  uploadCloud.fields([
    { name: "avatar", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ])(req, res, function (err) {
    if (err) {
      console.error("Upload lỗi:", err);
      return res.status(400).json({ error: "Lỗi upload ảnh", errorDetail: err.message });
    }

    // Nếu ảnh mới được upload, gán đường dẫn vào req.body
    if (req.files?.avatar && req.files.avatar[0]) {
      req.body.avatar = req.files.avatar[0].path;
    } else if (typeof req.body.avatar === "string") {
      // Giữ ảnh cũ
      console.log("Giữ nguyên avatar:", req.body.avatar);
    } else {
      req.body.avatar = null; // hoặc bỏ qua nếu cần
    }

    if (req.files?.backgroundImage && req.files.backgroundImage[0]) {
      req.body.backgroundImage = req.files.backgroundImage[0].path;
    } else if (typeof req.body.backgroundImage === "string") {
      // Giữ ảnh cũ
      console.log("Giữ nguyên background:", req.body.backgroundImage);
    } else {
      req.body.backgroundImage = null;
    }

    // Tiếp tục xử lý
    next();
  });
};
