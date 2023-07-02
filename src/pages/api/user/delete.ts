import { ObjectId } from "mongodb";
import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// PATCH - UPDATE USER BY ID
// DELETE - DELETE USER BY ID
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    const userId = session.user.id;

    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();
        // DELETE USER BY ID
        if (req.method === "DELETE") {
            // DELETE USER BY ID
            const user = await deleteUserById(new ObjectId(userId));
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const users = await User.find({})
            return res.status(200).json({ message: "User deleted successfully", users });
        }

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}


async function deleteUserById(userId: ObjectId) {
    try {
        const user = await User.findByIdAndDelete(userId);
        return user;
    }
    catch (error) {
        throw error;
    }
}


