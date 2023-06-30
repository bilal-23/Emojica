import { ObjectId } from "mongodb";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// GET - GET POST BY ID - POPULATE FOLLOWERS, FOLLOWING, AND BOOKMARKS
// PATCH - UPDATE POST BY ID
// DELETE - DELETE POST BY ID
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method !== "GET" && req.method !== "PATCH" && req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();
        // GET USER ID FROM URL
        const postId = req.query.postId as string;
        if (!postId) return res.status(400).json({ message: "Post ID is required" });
        const _id = new ObjectId(postId);

        // GET POST BY ID
        if (req.method === "GET") {
            const post = await getPostById(_id);
            if (!post) return res.status(404).json({ message: "Post not found" });
            return res.status(200).json({ post });
        }

        // UPDATE POST BY ID
        else if (req.method === "PATCH") {
            // GET UPDATED CONTENT FROM BODY
            const { content } = req.body;
            if (!content) return res.status(400).json({ message: "Content is required" });
            const post = await Post.findOneAndUpdate({ _id }, { content, updatedAt: new Date() });
            if (!post) return res.status(404).json({ message: "Post not found" });
            return res.status(200).json({ message: "Post updated successfully" });
        }

        // DELETE POST BY ID
        else if (req.method === "DELETE") {
            // DELETE POST BY ID
            const post = await Post.findOneAndDelete({ _id });
            if (!post) return res.status(404).json({ message: "Post not found" });
            return res.status(200).json({ message: "Post deleted successfully" });
        }

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

async function getPostById(_id: ObjectId) {
    return await Post.findOne({ _id }).populate(
        [
            { path: "author", select: "_id firstName pic username" },
            { path: "comments.user", select: "_id firstName pic username" },
            { path: "likes.likedBy", select: "_id firstName pic username" },
            { path: "likes.dislikedBy", select: "_id firstName pic username" }
        ]
    );
}