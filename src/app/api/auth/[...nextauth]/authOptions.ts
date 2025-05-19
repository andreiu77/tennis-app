import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const SESSION_MAX_AGE = 60 * 60; // 1 hour

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Fetch user by email
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });

                // Check if the user exists and if the password matches
                if (!user || user.password !== credentials.password) {
                    console.log("Invalid credentials");
                    return null;
                }

                // If valid, return the user object
                return { id: user.id.toString(), email: user.email, role: user.role };
            },
        }),
    ],
    session: {
        strategy: "jwt" as const,
        maxAge: SESSION_MAX_AGE, // 1 hour
    },
    callbacks: {
        // Callback for handling JWT token
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        // Callback for handling session data
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login-page', // Redirect user to custom login page
    },
};
