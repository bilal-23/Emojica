import { ObjectId } from "mongodb";
import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextAuthSession } from "@/types/user";

// PATCH - UPDATE USER BY ID
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // get auth token from header
    const session = await getServerSession(req, res, authOptions) as NextAuthSession | null;
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    const userId = session.user.id;

    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();

        // UPDATE USER BY ID
        // GET DATA FROM BODY
        const { firstName, lastName, username, email, link, bio, pic } = req.body;
        // UPDATE USER BY ID
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log({ user });
        await User.findOneAndUpdate({ _id: new ObjectId(userId) }, {
            firstName,
            lastName,
            username,
            email,
            link,
            bio,
            pic,
            updatedAt: new Date()
        });

        return res.status(200).json({ message: "User updated successfully" });
    }

    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

async function getUserById(userId: string) {
    const user = await User.findById(userId)
    return user;
}

