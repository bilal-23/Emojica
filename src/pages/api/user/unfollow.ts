import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";


// UNFOLLOW USER
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    const userId = session.user.id;

    try {
        await connectMongoDB();
        const { unfollowId } = req.body;
        if (!unfollowId) {
            return res.status(400).json({ message: "Unfollow Id is missing" });
        }
        if (!userId) {
            return res.status(400).json({ message: "User Id is missing" });
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
