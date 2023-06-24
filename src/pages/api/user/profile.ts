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
        const user = await User.findById(id).populate('following', '_id firstName pic username')
            .populate('followers', '_id firstName pic username')
        if (user.bookmars && user.bookmarks.length > 0) {
            user.populate({
                path: 'bookmarks',
                populate: {
                    path: 'author',
                    select: '_id firstName pic username'
                }
            });
        }
        // Remove the password fields
        user.password = undefined;

        return res.status(200).json({ profile: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}