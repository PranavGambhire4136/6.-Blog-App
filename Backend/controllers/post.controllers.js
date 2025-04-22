import { populate } from "dotenv";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadFile } from "./utils/uploadImage.js";

export const createPost = async (req, res) => {
    try {
        const {title, body} = req.body;
        const image = req.files?.img;

        if (!title || !body || !image) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const url = await uploadFile(image, "posts");
        const author = req.user.userId;
        // console.log("createPost author", author);

        const post = new Post({ title, body, image: url, author });
        await post.save();

        const user = await User.findById(author);
        user.posts.push(post._id);
        await user.save();

        return res.status(201).json({ success: true, message: "Post created successfully" });
    } catch (error) {
        console.error("error while createPost", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deletePost = async (req, res) => {
    try {
        // console.log("deletePost req.params", req.params);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Post id is required" });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const userId = await User.findById(post.author);
        const userLogedIn = req.user.userId;
        // console.log("postController userLogedIn", userLogedIn);
        // console.log("postController author", userId);

        if (userId._id.toString() !== userLogedIn.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await Post.findByIdAndDelete(id);

        const user = await User.findById(post.author);
        user.posts.pull(post._id);
        await user.save();

        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("error while deleting post", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("author", "username").populate({
            path: "comments", 
            populate: {
                path: "user",
                select: "username"
            }
        });
        
        return res.status(200).json({ success: true, posts});
    } catch (error) {
        console.error("error while getAllPosts", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({ author: userId }).populate("author", "username").populate({
            path: "comments", 
            populate: {
                path: "user",
                select: "username"
            }
        });
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("error while getUserPosts", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}