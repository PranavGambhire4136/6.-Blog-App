import User from "../models/User.js";

export const followUser = async (req, res) => {
    try {
        const {userToFollow} = req.params;
        
        if (!userToFollow) {
            return res.status(400).json({ success: false, message: "User to follow is required" });
        }

        const userDetails = await User.findById(userToFollow);
        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = req.user.userId;
        const userDetail2 = await User.findById(user);
        if (!userDetail2) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userDetails._id.toString() === userDetail2._id.toString()) {
            return res.status(400).json({ success: false, message: "You cannot follow yourself" });
        }

        if (userDetail2.followers.includes(userDetails._id)) {
            return res.status(400).json({ success: false, message: "You are already following this user" });
        }

        userDetail2.followers.push(userDetails._id);
        await userDetail2.save();

        userDetails.following.push(userDetail2._id);
        await userDetails.save();

        return res.status(200).json({ success: true, message: "User followed successfully" });
    } catch (error) {
        console.log("error while followUser", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const {userToUnfollow} = req.params;

        if (!userToUnfollow) {
            return res.status(400).json({ success: false, message: "User to unfollow is required" });
        }

        const userDetails = await User.findById(userToUnfollow);
        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = req.user.userId;
        const userDetail2 = await User.findById(user);
        if (!userDetail2) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userDetails._id.toString() === userDetail2._id.toString()) {
            return res.status(400).json({ success: false, message: "You cannot unfollow yourself" });
        }

        if (!userDetail2.followers.includes(userDetails._id)) {
            return res.status(400).json({ success: false, message: "You are not following this user" });
        }

        userDetail2.followers.pull(userDetails._id);
        await userDetail2.save();

        userDetails.following.pull(userDetail2._id);
        await userDetails.save();

        return res.status(200).json({ success: true, message: "User unfollowed successfully" });
    } catch (error) {
        console.log("error while unfollowUser", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}