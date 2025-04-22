import Comment from "./../models/Comment.js";
import Post from "./../models/Post.js";
import User from "./../models/User.js";

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const user = req.user.userId;
        const post = req.params.post; 

        if (!content || !user || !post) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const postDetail = await Post.findById(post);
        if (!postDetail) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const userDetail = await User.findById(user);
        if (!userDetail) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const comment = new Comment({ content, user, post });
        await comment.save();

        postDetail.comments.push(comment._id);
        await postDetail.save();

        return res.status(201).json({ success: true, message: "Comment created successfully" });
    }catch(err) {
        console.error("error while createComment", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const {comment} = req.params;

        if (!comment) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const commentDetail = await Comment.findById(comment);
        if (!commentDetail) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        const user = req.user.userId;
        const userDetail = await User.findById(user);
        if (!userDetail) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userDetail._id.toString() !== commentDetail.user.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized to delete comment" });
        }

        const postDetail = await Post.findById(commentDetail.post);
        postDetail.comments.pull(commentDetail._id);
        await postDetail.save();
        await Comment.findByIdAndDelete(commentDetail._id);
        

        return res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("error while deleteComment", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

