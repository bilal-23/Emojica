import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";

// Get ALL POSTS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectMongoDB();
    // Get ALL POSTS
    if (req.method === "GET") {
      const posts = await getPosts();
      return res.status(200).json({ posts });
    }
    //
    //
    // Create a POST
    else if (req.method === "POST") {
      const { content, authorEmail } = req.body;

      if (!content || !authorEmail) {
        return res.status(400).json({ message: "Bad Request" });
      }

      // FIND USER WITH EMAIL
      const user = await User.findOne({ email: authorEmail });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const author = user._id;
      const newPost = new Post({
        content,
        author,
        likes: {
          likedBy: ["648576e682701dda36b1e99e"],
          dislikedBy: ["648576e682701dda36b1e99e"],
        },
      });

      await newPost.save();
      return res.status(201).json({ message: "Post Created" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

async function getPosts() {
  const posts = await Post.find({})
    .populate([
      { path: "author", select: "_id firstName pic username" },
      { path: "comments.user", select: "_id firstName pic username" },
      { path: "likes.likedBy", select: "_id firstName pic username" },
      { path: "likes.dislikedBy", select: "_id firstName pic username" },
    ])
    .sort({ createdAt: -1 }); // -1: DESC, 1: ASC
  return posts;
}
