import express from "express";

import { login, logout, singUpInit, verifyOtp, getUserProfile, getMyProfile } from "../controllers/user.controllers.js";
import { isThere } from "../MiddleWare/getHeader.js";

const router = express.Router();

router.post("/login", login);
router.post("/singUpInit", singUpInit);
router.post("/verifyOtp", verifyOtp);
router.get("/logout", isThere, logout);
router.get("/profile/:userId", getUserProfile);
router.get("/profile", isThere, getMyProfile);

export default router;