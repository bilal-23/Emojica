import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";


// FOLLOW USER
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
        const { followId } = req.body;
        if (!userId || !followId) {
            return res.status(400).json({ message: "Id is missing" });
        }
        // Check if user and account to be followed exists
        const user = await User.findById(userId);
        const follow = await User.findById(followId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!follow) {
            return res.status(404).json({ message: "Account to be followed not found" });
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
