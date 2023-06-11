import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";

// UNFOLLOW USER
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await connectMongoDB();
        const { userId, unfollowId } = req.body;
        if (!userId || !unfollowId) {
            return res.status(400).json({ message: "Id is missing" });
        }
        // Check if user and account to be followed exists
        const user = await User.findById(userId);
        const unfollow = await User.findById(unfollowId);
        if (!user || !unfollow) {
            return res.status(404).json({ message: "User or account to be followed not found" });
        }
        // CHECK IF USER NOT FOLLOWING
        const isFollowing = user.following.includes(unfollowId);
        if (!isFollowing) {
            return res.status(400).json({ message: "Not following" });
        }
        // Remove from following array
        const index = user.following.indexOf(unfollowId);
        if (index > -1) {
            user.following.splice(index, 1);
        }
        // Remove from followers array
        const index2 = unfollow.followers.indexOf(userId);
        if (index2 > -1) {
            unfollow.followers.splice(index2, 1);
        }

        await user.save();
        await unfollow.save();
        return res.status(200).json({ message: "Unfollowed successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}


// This Does Not Populate the Followers, Following, and Bookmarks