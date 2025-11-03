import authRouter from "./auth.route.js";
import verifyToken from "../middlewares/auth.js";
import authorRouter from "./author.route.js";
import storyRouter from "./story.route.js";
import topicRouter from "./topic.route.js";
import chapterRouter from "./chapter.route.js";
import genreRouter from "./genre.route.js";
import adminRouter from "./admin.route.js";
import adminAuthRouter from "./adminAuth.route.js";
import userRouter from "./user.route.js";
import commentRouter from "./comment.route.js";
import rateRouter from "./rate.route.js";
import bannerRouter from "./banner.route.js";
import checkChangeToken from "../middlewares/checkChangeToken.js";

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/story", checkChangeToken, storyRouter);
  app.use("/chapter", checkChangeToken, chapterRouter);
  app.use("/topic", checkChangeToken, topicRouter);
  app.use("/genre", checkChangeToken, genreRouter);
  app.use("/author", checkChangeToken, authorRouter);
  app.use("/user", checkChangeToken, userRouter);
  app.use("/comment", checkChangeToken, commentRouter);
  app.use("/rate", checkChangeToken, rateRouter);
  app.use("/banner", checkChangeToken, bannerRouter);

  app.use("/adminauth", adminAuthRouter);
  app.use("/admin", verifyToken, adminRouter);
};

export default route;
