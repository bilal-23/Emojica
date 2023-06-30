import { ObjectId } from "mongodb";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// GET - GET ALL POST OF A USER BY ID - POPULATE FOLLOWERS, FOLLOWING, AND BOOKMARKS
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();
        // GET USER ID FROM URL
        const userId = req.query.userId as string;
        if (!userId) return res.status(400).json({ message: "Post ID is required" });
        const _id = new ObjectId(userId);

        // CHECK IF USER EXISTS
        const user = await User.findOne({ _id });
        if (!user) return res.status(404).json({ message: "User not found" });

        // GET POST BY AUTHOR ID
        const posts = await Post.find({ author: _id }).populate(
            [
                { path: "author", select: "_id firstName pic username" },
                { path: "comments.user", select: "_id firstName pic username" },
                { path: "likes.likedBy", select: "_id firstName pic username" },
                { path: "likes.dislikedBy", select: "_id firstName pic username" }
            ]
        );
        return res.status(200).json({ posts });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
