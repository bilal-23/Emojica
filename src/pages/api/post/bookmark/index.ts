import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";


// GET - Bookmarks of logged in user
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

    const userId = session.user.id;

    try {
        await connectMongoDB();

        // GET USER BY ID
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" });

        // Get bookmarks of user 
        const bookmarks = user.bookmarks;
        if (bookmarks.length === 0) return res.status(200).json({ bookmarks: [], message: "No bookmarks" });

        // Get bookmarked posts from POSTS collection
        const bookmarkedPosts = await Post.find({ _id: { $in: bookmarks } }).populate([
            { path: "author", select: "_id firstName lastName pic username" },
            { path: "comments.user", select: "_id firstName lastName pic username" },
        ]);

        if (bookmarkedPosts.length === 0) return res.status(200).json({ bookmarks: [], message: "No bookmarks" });

        return res.status(200).json({ bookmarks: bookmarkedPosts, message: "Bookmarks" });


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

async function getPosts() {
    const posts = await Post.find({})
        .populate([
            { path: "author", select: "_id firstName lastName pic username" },
            { path: "comments.user", select: "_id firstName lastName pic username" },
        ])
        .sort({ createdAt: -1 }); // -1: DESC, 1: ASC
    return posts;
}
