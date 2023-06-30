import { Post } from "@/models/post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// Get ALL POSTS - POPULATES AUTHOR AND COMMENTS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = session.user.id;

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
      const { content, imageUrl = '' } = req.body;

      if (!content) {
        return res.status(400).json({ message: "Bad Request" });
      }

      // FIND USER WITH EMAIL
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const author = user._id;
      const newPost = new Post({
        content,
        author,
        imageUrl,
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
    ])
    .sort({ createdAt: -1 }); // -1: DESC, 1: ASC
  return posts;
}
