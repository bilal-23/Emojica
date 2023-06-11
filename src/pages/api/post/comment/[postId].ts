import { ObjectId } from "mongodb";
import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";

// GET - GET COMMENTS OF A POST BY ID
//POST - ADD COMMENT TO A POST
// PATCH - UPDATE COMMENT OF A POST

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET" && req.method !== "POST" && req.method !== "PATCH" && req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();
        // GET POST ID FROM URL
        const postId = req.query.postId as string;
        if (!postId) return res.status(400).json({ message: "Post ID is required" });
        const _id = new ObjectId(postId);

        const post = await getPostById(_id);
        if (!post) return res.status(404).json({ message: "Post Not Found" });

        // GET COMMENTS OF A POST
        if (req.method === "GET") {
            return res.status(200).json({ comments: post.comments.sort((a: any, b: any) => b.createdAt - a.createdAt) });
        }

        if (req.method === "POST") {
            const { comment, userId } = req.body;
            if (!comment) return res.status(400).json({ message: "Comment is required" });
            if (!userId) return res.status(400).json({ message: "User ID is required" });

            // Check if user id is valid
            const _userId = new ObjectId(userId);
            const user = await User.findOne({ _id: _userId });
            if (!user) return res.status(404).json({ message: "User Not Found" });

            // Add comment to post
            const newComment = {
                _id: new ObjectId(),
                comment,
                user: _userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            post.comments.push(newComment);
            await post.save();

            return res.status(200).json({ message: "Comment Added Successfully", comment: newComment });
        }

        // UPDATE COMMENT OF A POST
        if (req.method === "PATCH") {
            const { commentId, comment, userId } = req.body;
            if (!commentId) return res.status(400).json({ message: "Comment ID is required" });
            if (!comment) return res.status(400).json({ message: "Comment is required" });

            // Check if user id is valid
            const _userId = new ObjectId(userId);
            const user = await User.findOne({ _id: _userId });
            if (!user) return res.status(404).json({ message: "User Not Found" });

            // Check if comment id is valid
            const _commentId = new ObjectId(commentId);
            const commentIndex = post.comments.findIndex((comment: any) => comment._id.toString() === _commentId.toString());

            if (post.comments[commentIndex].user._id.toString() !== userId) {
                return res.status(403).json({ message: "You are not allowed to update this comment" });
            }


            if (commentIndex === -1) return res.status(404).json({ message: "Comment Not Found" });

            post.comments[commentIndex].comment = comment;
            post.comments[commentIndex].updatedAt = new Date();
            await post.save();

            return res.status(200).json({ message: "Comment Updated Successfully", comment: post.comments[commentIndex] });
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