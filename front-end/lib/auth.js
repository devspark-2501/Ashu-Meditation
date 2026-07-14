import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

/**
 * Central Auth.js (NextAuth v5) configuration.
 *
 * Two providers:
 *  - Google: standard OAuth sign-in.
 *  - Credentials: email + password, checked against the MongoDB `users`
 *    collection. Used by both the Login page (existing account) and the
 *    Create Account flow (auto sign-in right after registration).
 *
 * Required env vars (.env.local):
 *   MONGODB_URI=...
 *   GOOGLE_CLIENT_ID=...
 *   GOOGLE_CLIENT_SECRET=...
 *   AUTH_SECRET=...          (generate with: npx auth secret)
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                await connectDB();

                const user = await User.findOne({
                    email: credentials.email.toLowerCase(),
                }).select('+password');

                // No user, or an account that only has Google sign-in (no password set)
                if (!user || !user.password) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValid) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],

    pages: {
        signIn: '/login',
    },

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id ?? token.sub;
            }
            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
});