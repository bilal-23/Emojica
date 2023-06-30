import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// Get ALL USERS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const userId = session.user.id;

  try {
    await connectMongoDB();
    // Get ALL USERS
    const users = await User.find({});
    // REMOVE THE PASSWORD AND EMAIL FIELD FROM ALL THE USERS
    users.forEach((user) => {
      user.password = undefined;
      user.email = undefined;
      user.bookmarks = undefined;
    });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

