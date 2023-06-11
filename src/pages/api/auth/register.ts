import { User } from "@/models/user";
import { connectMongoDB } from '@/lib/mongoConnect';
import { NextApiRequest, NextApiResponse } from 'next';

// Create a new user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectMongoDB();
        // Extract values from req.body
        const { firstName, lastName, username, email, password } = req.body;

        // Check if the user with email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}