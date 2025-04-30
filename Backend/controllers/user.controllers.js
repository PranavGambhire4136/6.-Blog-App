import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const Verifier = require("email-verifier");

import User from "../models/User.js";
import TempUser from "../models/TempUser.js";

import { generateOpt } from "./utils/OtpGeneratorAndMailUser.js";
import { sendMail } from "./utils/OtpGeneratorAndMailUser.js";

export const singUpInit = async (req, res) => {
    try {
        // console.log("singUpInit", req.body);
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }) || await TempUser.findOne({ email });
        const usernameExists = await User.findOne({ username }) || await TempUser.findOne({ username });

        // console.log(user, usernameExists);
        if (user) {
            return res.status(400).json({ success: false, message: "email already exists" });
        }
        if (usernameExists) {
            return res.status(400).json({ success: false, message: "username already exists" });
        }

        const otp = generateOpt();
        const tempUser = new TempUser({ username, email, otp });
        tempUser.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const mail = await sendMail(email, otp);
        if (!mail) {
            return res.status(400).json({ success: false, message: "failed to send mail" });
        }
        await tempUser.save();

        // console.log(tempUser);
        res.status(201).json({ success: true, message: "temperary user created successfully" });
    } catch (error) {
        console.error("error while signUPInit", error.message);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp, password, confirmPassword, username } = req.body;
        if (!email || !otp || !password || !confirmPassword || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const tempUser = await TempUser.findOne({ email });
        if (!tempUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (tempUser.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        await TempUser.deleteOne({ email });
        res.status(200).json({ success: true, message: "User created successfully" });


    } catch (error) {
        console.error("error while verifyOtp", error.message);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}

export const login = async (req, res) => {
    try {
        console.log('login');
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email }) || await User.findOne({ username: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000,
        });

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("error while login", error.message);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(0),
        })
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("error while logout", error.message);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}

export const getUserProfile = async (req, res) => {
    try {
        console.log("started in profile");
        console.log(req.params);
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password').populate("posts");
        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("completed");
        res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("error while getting user profile", error.message);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}

export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("error while getting my profile", error.message);
        res.status(500).json({ success: false, message: "Internal server error" }); 
    }
}