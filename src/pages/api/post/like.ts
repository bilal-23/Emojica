import { ObjectId } from "mongodb";
import { User } from "@/models/user";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";

// Like a post
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();
        // GET USER ID AND POST ID FROM REQUEST BODY
        const { userId, postId } = req.body;
        const _id = new ObjectId(userId);
        if (!userId || !postId) {
            return res.status(400).json({ message: "Missing userId or postId" });
        }
        // FIND USER BY ID
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Increase like field by one
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // CHECK IF ALREADY LIKED
        if (post.likes.likedBy.includes(_id)) {
            return res.status(400).json({ message: "Post is already liked" });
        }

        post.likes.likeCount += 1;
        post.likes.likedBy.push(_id);
        // Remove user from dislikedBy array if present
        const index = post.likes.dislikedBy.indexOf(_id);
        if (index > -1) {
            post.likes.dislikedBy.splice(index, 1);
        }
        await post.save();

        return res.status(200).json({ message: "Post liked successfully" });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
