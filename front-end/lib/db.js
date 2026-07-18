import mongoose from 'mongoose';

/**
 * Next.js reloads modules in dev, which would normally open a new Mongo
 * connection on every hot reload. Caching the connection on `global`
 * keeps a single connection alive across reloads/serverless invocations.
 */
let cached = global._mongooseCache;

if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            "Missing MONGODB_URI. Add it to .env.local (locally) or your Vercel project's Environment Variables (in production), e.g. MONGODB_URI=mongodb+srv://..."
        );
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { bufferCommands: false })
            .then((m) => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;