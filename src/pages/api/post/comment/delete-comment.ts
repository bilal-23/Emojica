import { ObjectId } from "mongodb";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";

// DELETE COMMENT OF A POST

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();

        const { postId, commentId, userId } = req.body;
        if (!postId) return res.status(400).json({ message: "Post ID is required" });
        if (!commentId) return res.status(400).json({ message: "Comment ID is required" });
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const _id = new ObjectId(postId);
        const post = await getPostById(_id);
        if (!post) return res.status(404).json({ message: "Post Not Found" });

        const user = await User.findOne({ _id: new ObjectId(userId) });
        if (!user) return res.status(404).json({ message: "User Not Found" });

        const commentIndex = post.comments.findIndex((comment: any) => comment._id.toString() === commentId);
        if (commentIndex === -1) return res.status(404).json({ message: "Comment Not Found" });

        const comment = post.comments[commentIndex];

        if (comment.user._id.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this comment" });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();

        return res.status(200).json({ message: "Comment Deleted Successfully" });
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