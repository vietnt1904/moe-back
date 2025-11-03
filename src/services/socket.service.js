import { io } from "../app";

const SocketService = {
  async sendNotifications(users) {
    try {
      io.emit("new_chapter", {
        message: "Truyện bạn theo dõi vừa có 1 chương mới",
        time: new Date(),
      });
    } catch (err) {
      console.log("Error when send notification by socket io", err);
      throw err;
    }
  },
};

export default SocketService;
