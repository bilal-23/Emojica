import { User } from "@/models/user";
import { connectMongoDB } from '@/lib/mongoConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from "@/lib/hashPassword";

const avatars = [
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/pikachu_RVvSDjez36.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/bullbasaur_Y85PdUY9me.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/charmander_wymQBDZmjf.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/eevee_UdoioiFjvy.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar_uZAJcosB-g.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/meowth_V55QXMkA6u.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar__3__0FVtZ-e04.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar__2__EUz3ORKS9b.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/abra_hHs9jcb40.png",
    "https://ik.imagekit.io/averno2301/Emojica/User_Avatar/avatar__1__jCOnS8Osy.png"
]

// Create a new user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectMongoDB();
        // Extract values from req.body
        const { firstName, lastName, username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address', id: "email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Bad request', error: 'Password should be at least 6 characters in length' });
        }

        // Check if the user with email already exists
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ message: 'Email linked to different account', id: "email" });
        }
        const userUsername = await User.findOne({ username });
        if (userUsername) {
            return res.status(400).json({ message: 'Username not available', id: "username" });
        }
        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            pic: avatars[Math.floor(Math.random() * avatars.length)],
            password
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

