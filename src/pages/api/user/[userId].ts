import { ObjectId } from "mongodb";
import { User } from "@/models/user";
// import { Post } from "@/models/Post";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";

// GET - GET USER BY ID - POPULATE FOLLOWERS, FOLLOWING, AND BOOKMARKS
// PATCH - UPDATE USER BY ID
// DELETE - DELETE USER BY ID
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET" && req.method !== "PATCH" && req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();
        // GET USER ID FROM URL
        const userId = req.query.userId as string;
        if (!userId) return res.status(400).json({ message: "User ID is required" });
        const _id = new ObjectId(userId);

        // GET USER BY ID
        if (req.method === "GET") {
            const user = await getUserById(_id);
            return res.status(200).json({ user });
        }

        // UPDATE USER BY ID
        else if (req.method === "PATCH") {
            // GET DATA FROM BODY
            const { firstName, lastName, username, email, link, bio, pic } = req.body;
            // UPDATE USER BY ID
            await User.updateOne({ _id }, {
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

        // DELETE USER BY ID
        else if (req.method === "DELETE") {
            // DELETE USER BY ID
            await deleteUserById(_id);
            return res.status(200).json({ message: "User deleted successfully" });
        }

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

async function getUserById(_id: ObjectId) {
    return await User.find({ _id })
        .populate('following', '_id firstName pic username')
        .populate('followers', '_id firstName pic username')
        .populate('bookmarks');
}

async function deleteUserById(_id: ObjectId) {
    // DELETE USER BY ID
    return await User.deleteOne({ _id });
}