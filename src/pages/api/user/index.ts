import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// Get ALL USERS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = session.user as {
    email: string;
    sub: string;
    id: string;
    iat: number;
    exp: number;
    jti: string;
  };


  try {
    await connectMongoDB();
    // Get ALL USERS
    const users = await User.find({});
    // Exclude the logged in user
    const filteredUsers = users.filter((user) => user._id.toString() !== id);

    // Remove the password field and bookmarks from the filtered users
    filteredUsers.forEach((user) => {
      user.password = undefined;
      user.bookmarks = undefined;
    });
    // Return the filtered users
    return res.status(200).json({ users: filteredUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}


// This Does Not Populate the Followers, Following, and Bookmarks