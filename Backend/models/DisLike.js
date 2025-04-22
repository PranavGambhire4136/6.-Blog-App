import mongoose from "mongoose";

const disLikeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

export default mongoose.model("DisLike", disLikeSchema);