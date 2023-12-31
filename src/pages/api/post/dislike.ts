import { User } from "@/models/user";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// dislike a post
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
        // GET USER ID AND POST ID FROM REQUEST BODY
        const { postId } = req.body;
        if (!userId || !postId) {
            return res.status(400).json({ message: "Missing userId or postId" });
        }
        // FIND USER BY ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Increase like field by one
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // CHECK IF ALREADY DISLIKED
        if (post.likes.dislikedBy.includes(userId)) {
            return res.status(400).json({ message: "Post is already disliked" });
        }

        post.likes.dislikedBy.push(userId);
        // Remove user from likedBy array if present
        const index = post.likes.likedBy.indexOf(userId);
        if (index > -1) {
            post.likes.likedBy.splice(index, 1);
        }

        post.likes.likeCount = post.likes.likedBy.length;

        await post.save();

        return res.status(200).json({ message: "Post disliked successfully" });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
