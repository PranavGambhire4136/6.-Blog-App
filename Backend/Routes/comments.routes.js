import express from "express";
import { createComment, deleteComment } from "../controllers/comments.controllers.js";
import { isThere } from "../MiddleWare/getHeader.js";

const router = express.Router();

router.post("/add/:post", isThere, createComment);
router.post("/delete/:comment", isThere, deleteComment);

export default router;