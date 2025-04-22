import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        default: [],
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    dislikes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);