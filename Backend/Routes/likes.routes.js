import express from "express";
import { disLikePost, likePost, removeDislike, removeLike } from "../controllers/likes.controllers.js";
import { isThere } from "../MiddleWare/getHeader.js";

const router = express.Router();

router.post("/likePost/:post", isThere, likePost);
router.post("/removeLike/:post", isThere, removeLike);

router.post("/disLikePost/:post", isThere, disLikePost);
router.post("/removeDislike/:post", isThere, removeDislike);

export default router;