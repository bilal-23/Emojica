import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";
import { User } from "@/models/user";


// GET FEED POST BY USERS YOU FOLLOW
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET" && req.method !== "PATCH" && req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    const userId = session.user.id;

    try {
        await connectMongoDB();
        // Get User
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Get feed posts by users you follow and your own posts
        const authorIds = [...user.following, userId];

        const feedPosts = await Post.find({ author: { $in: authorIds } }).populate(
            [
                { path: "author", select: "_id firstName lastName pic username" }
            ]
        ).sort({ createdAt: -1 });

        return res.status(200).json({ feedPosts });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
