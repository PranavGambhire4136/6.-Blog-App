import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    contentRestrictions: {
        type: Array,
        default: [],
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    dislikes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
});

export default mongoose.model("User", userSchema);