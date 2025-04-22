import express from "express";

import { login, logout, singUpInit, verifyOtp } from "../controllers/user.controllers.js";
import { isThere } from "../MiddleWare/getHeader.js";

const router = express.Router();

router.post("/login", login);
router.post("/singUpInit", singUpInit);
router.post("/verifyOtp", verifyOtp);
router.get("/logout", isThere, logout);

export default router;