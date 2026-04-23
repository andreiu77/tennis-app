import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { authenticator } from "otplib";

const SESSION_MAX_AGE = 60 * 60; // 1 hour

authenticator.options = {
    step: 30, // 30 seconds
    window: 1, // allow one window before/after (±30s)
};

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                token: { label: "2FA Token", type: "text", optional: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || user.password !== credentials.password) {
                    console.log("Invalid credentials");
                    return null;
                }

                if (user.twoFactorEnabled) {
                    if (!credentials.token) {
                        throw new Error("2FA_REQUIRED");  // Throw error instead of returning partial user
                    }

                    const isValidToken = authenticator.check(credentials.token, user.twoFactorSecret);

                    if (!isValidToken) {
                        return null;
                    }

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        role: user.role,
                    };
                }
                else
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        role: user.role,
                    };
            }


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
                if (user.twoFactorRequired) {
                    token.twoFactorRequired = true; // Pass this flag to frontend
                }
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
