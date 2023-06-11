import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";

// FOLLOW USER
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await connectMongoDB();
        const { userId, followId } = req.body;
        if (!userId || !followId) {
            return res.status(400).json({ message: "Id is missing" });
        }
        // Check if user and account to be followed exists
        const user = await User.findById(userId);
        const follow = await User.findById(followId);
        if (!user || !follow) {
            return res.status(404).json({ message: "User or account to be followed not found" });
        }
        // Check if already following
        const isFollowing = user.following.includes(followId);
        if (isFollowing) {
            return res.status(400).json({ message: "Already following" });
        }
        // Push to following array
        user.following.push(followId);
        // Push to followers array
        follow.followers.push(userId);
        await user.save();
        await follow.save();
        return res.status(200).json({ message: "Followed successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}


// This Does Not Populate the Followers, Following, and Bookmarks