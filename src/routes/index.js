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

const route = (app) => {
    // app.use(verifyToken);
    app.use("/auth", authRouter);
    app.use("/story", storyRouter);
    app.use("/chapter", chapterRouter);
    app.use("/topic", topicRouter);
    app.use("/genre", genreRouter);
    app.use("/author", authorRouter);
    app.use("/user", userRouter)

    app.use("/adminauth", adminAuthRouter);
    app.use("/admin", verifyToken, adminRouter);
};

export default route;
