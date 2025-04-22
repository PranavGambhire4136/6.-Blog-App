import Like from "./../models/Like.js";
import User from "./../models/User.js";
import DisLike from "./../models/DisLike.js";
import Post from "./../models/Post.js";

export const likePost = async (req, res) => {
    try {
        const { post } = req.params;
        
        if (!post) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const postDetail = await Post.findById(post);
        if (!postDetail) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const user = req.user.userId;
        const userDetail = await User.findById(user);
        userDetail.likes.push(post);

        const disLike = await DisLike.findOne({ post, user });
        if (disLike) {
            await DisLike.findByIdAndDelete(disLike._id);
            await postDetail.dislikes.pull(disLike._id);
            await postDetail.save();
            await userDetail.dislikes.pull(post);
            await userDetail.save();
        }
        
        const like = new Like({ post, user });
        
        postDetail.likes.push(like._id);

        postDetail.save();
        await userDetail.save();
        like.save();

        return res.status(201).json({ success: true, message: "Post liked successfully" });
    } catch (error) {
        console.error("error while likePost", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const disLikePost = async (req, res) => {
    try {
        const {post} = req.params;

        if (!post) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const postDetail = await Post.findById(post);
        if (!postDetail) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const user = req.user.userId;
        const userDetail = await User.findById(user);
        userDetail.dislikes.push(post);

        const like = await Like.findOne({ post, user });
        if (like) {
            await Like.findByIdAndDelete(like._id);
            await postDetail.likes.pull(like._id);
            await postDetail.save();
            await userDetail.likes.pull(post);
            await userDetail.save();
        }

        userDetail.save();

        const disLike = new DisLike({ post, user });

        postDetail.dislikes.push(disLike._id);

        postDetail.save();
        disLike.save();

        return res.status(201).json({ success: true, message: "Post disliked successfully" });
    } catch (error) {
        console.error("error while disLikePost", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const removeLike = async (req, res) => {
    try {
        const {post} = req.params;

        if (!post) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const postDetail = await Post.findById(post);
        if (!postDetail) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const user = req.user.userId;
        const userDetail = await User.findById(user);

        const like = await Like.findOne({ post, user });
        if (!like) {
            return res.status(404).json({ success: false, message: "Like not found" });
        }

        await Like.findByIdAndDelete(like._id);
        await postDetail.likes.pull(like._id);
        await postDetail.save();
        await userDetail.likes.pull(post);
        await userDetail.save();

        return res.status(200).json({ success: true, message: "Like removed successfully" });
    } catch (error) {
        console.log("error while removeLike", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const removeDislike = async (req, res) => {
    try {
        const {post} = req.params;

        if (!post) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const postDetail = await Post.findById(post);

        if (!postDetail) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const user = req.user.userId;
        const userDetail = await User.findById(user);

        const disLike = await DisLike.findOne({ post, user });
        if (!disLike) {
            return res.status(404).json({ success: false, message: "Dislike not found" });
        }

        await DisLike.findByIdAndDelete(disLike._id);
        await postDetail.dislikes.pull(disLike._id);
        await postDetail.save();
        await userDetail.dislikes.pull(post);
        await userDetail.save();

        return res.status(200).json({ success: true, message: "Dislike removed successfully" });
    } catch (error) {
        console.error("error while removeDislike", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}