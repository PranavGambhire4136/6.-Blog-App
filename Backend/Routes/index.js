import express from "express";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import likeRouter from "./likes.routes.js";
import commentRouter from "./comments.routes.js";
import followRouter from "./followers.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/like", likeRouter)
router.use("/comment", commentRouter)
router.use("/follow", followRouter)

export default router;