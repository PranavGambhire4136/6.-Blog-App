import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    otp: {
        type: String,
        required: true,
        unique: true
    },
    otpExpiresAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 },
    },
});

export default mongoose.model("TempUser", tempUserSchema);