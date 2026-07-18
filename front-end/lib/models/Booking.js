import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        // Ties this booking to the account that submitted it. Every booking
        // must belong to a logged-in user — that's what "only appears when
        // logged in" actually enforces at the data layer, not just the UI.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        // ── Personal Information ──────────────────────────────────────
        fullName: { type: String, required: true, trim: true },
        dob: { type: String, required: true }, // free text: accepts either a date or an age, per the form
        gender: {
            type: String,
            enum: ['Prefer not to say', 'Female', 'Male', 'Non-binary', 'Other'],
        },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        location: { type: String, required: true, trim: true }, // city and country

        // ── Emergency Contact ─────────────────────────────────────────
        emergencyName: { type: String, required: true, trim: true },
        emergencyRelation: { type: String, required: true, trim: true },
        emergencyPhone: { type: String, required: true, trim: true },

        // ── Meditation Background ─────────────────────────────────────
        practicedBefore: { type: String, enum: ['Yes', 'No'], required: true },
        practiceDuration: { type: String, trim: true }, // only meaningful if practicedBefore === 'Yes'
        priorCourses: { type: String, enum: ['Yes', 'No'] },

        // ── Health Information (all optional, instructor-only) ───────
        medicalConditions: { type: String, trim: true },
        mentalHealth: { type: String, trim: true },
        medications: { type: String, trim: true },
        accessibility: { type: String, trim: true },

        // ── Course Preferences ────────────────────────────────────────
        batch: { type: String, enum: ['Morning', 'Evening', 'Weekend'], required: true },
        format: { type: String, enum: ['Online', 'In-Person'], required: true },
        language: { type: String, required: true, trim: true },

        // ── Goals ──────────────────────────────────────────────────────
        whyJoin: { type: String, required: true, trim: true },
        expectations: { type: String, required: true, trim: true },

        // ── Consent ────────────────────────────────────────────────────
        consentWellness: { type: Boolean, required: true },
        consentGuidelines: { type: Boolean, required: true },
        consentUpdates: { type: Boolean, default: false },

        // ── Payment ────────────────────────────────────────────────────
        paymentStatus: {
            type: String,
            enum: ['Not Paid', 'Paid', 'Pending Verification'],
            required: true,
            default: 'Not Paid',
        },
        // File uploads aren't wired to storage yet (no S3/Cloudinary set up).
        // Once that exists, save the resulting URL here instead of a raw filename.
        receiptUrl: { type: String, trim: true },
        coupon: { type: String, trim: true },

        // ── Optional ───────────────────────────────────────────────────
        hearAboutUs: { type: String, trim: true },
        referredBy: { type: String, trim: true },
        comments: { type: String, trim: true },

        // ── Internal / admin-facing ───────────────────────────────────
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

// Prevents "Cannot overwrite `Booking` model" errors during Next.js hot reload.
export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);