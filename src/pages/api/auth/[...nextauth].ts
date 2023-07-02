import { hashPassword, verifyPassword } from "@/lib/hashPassword";
import { connectMongoDB } from "@/lib/mongoConnect";
import { User } from "@/models/user";
import NextAuth, { NextAuthOptions, } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectMongoDB();

                const { email, password } = credentials as { email: string, password: string };

                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("No user found with this email");
                }
                const isValid = await verifyPassword(password, user.password);

                if (!isValid) {
                    throw new Error("Incorrect password")
                }
                else {
                    return Promise.resolve(user);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
};

export default NextAuth(authOptions);
