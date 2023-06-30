import { ObjectId } from "mongodb";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

//POST - BOOKMARK A POST
//DELETE - UNBOOKMARK A POST
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method !== "POST" && req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await connectMongoDB();
        // GET POST ID FROM URL
        const postId = req.query.postId as string;
        if (!postId) return res.status(400).json({ message: "Post ID is required" });
        const _id = new ObjectId(postId);

        const userId = session.user.id;
        if (!userId) return res.status(400).json({ message: "User ID is required" });
        const _userId = new ObjectId(userId);

        const post = await getPostById(_id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const user = await User.findOne({ _id: _userId });

        // ADD POST TO BOOKMARKS
        if (req.method === "POST") {
            // CHECK IF POST IS ALREADY BOOKMARKED
            const isBookmarked = user.bookmarks.includes(_id);
            if (isBookmarked) return res.status(400).json({ message: "Post already bookmarked" });

            // ADD POST TO BOOKMARKS
            user.bookmarks.push(_id);
            await user.save();
            return res.status(200).json({ message: "Post bookmarked" });
        }

        // DELETE POST FROM BOOKMARKS
        else if (req.method === "DELETE") {
            // CCHECK IF POST IS NOT BOOKMARKED
            const isBookmarked = user.bookmarks.includes(_id);
            if (!isBookmarked) return res.status(400).json({ message: "Post not bookmarked" });

            // DELETE POST FROM BOOKMARKS
            user.bookmarks = user.bookmarks.filter((bookmark: any) => bookmark.toString() !== _id.toString());
            await user.save();
            return res.status(200).json({ message: "Post unbookmarked" });
        }

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

async function getPostById(_id: ObjectId) {
    return await Post.findOne({ _id }).populate(
        [
            { path: "author", select: "_id firstName lastName  pic username" },
            { path: "comments.user", select: "_id firstName lastName  pic username" },
            { path: "likes.likedBy", select: "_id firstName lastName  pic username" },
            { path: "likes.dislikedBy", select: "_id firstName lastName  pic username" }
        ]
    );
}