import express from "express";
import { createPost, deletePost, getAllPosts, getUserPosts } from "../controllers/post.controllers.js";
import { isThere } from "../MiddleWare/getHeader.js";

const router = express.Router();

router.post("/create", isThere, createPost);
router.post("/delete/:id", isThere, deletePost);
router.post("/getAllPost", getAllPosts);
router.post("/getUserPost/:userId", getUserPosts);

export default router;