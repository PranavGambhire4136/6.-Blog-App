import express from "express";
import { isThere } from "../MiddleWare/getHeader.js";
import { followUser, unfollowUser } from "../controllers/followers.controllers.js";

const router = express.Router();

router.post("/follow/:userToFollow", isThere, followUser);
router.post("/unfollow/:userToUnfollow", isThere, unfollowUser);

export default router;