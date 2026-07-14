import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        // Absent/undefined for accounts that only ever signed in with Google.
        password: {
            type: String,
            select: false, // never returned from queries unless explicitly requested
        },
        provider: {
            type: String,
            enum: ['credentials', 'google'],
            default: 'credentials',
        },
    },
    { timestamps: true }
);

// Prevents "Cannot overwrite `User` model" errors during Next.js hot reload.
export default mongoose.models.User || mongoose.model('User', UserSchema);