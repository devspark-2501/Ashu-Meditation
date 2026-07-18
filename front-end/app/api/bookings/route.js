import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectDB from '@/lib/db';
import Booking from '@/lib/models/Booking';

const REQUIRED_FIELDS = [
    'fullName',
    'dob',
    'phone',
    'email',
    'location',
    'emergencyName',
    'emergencyRelation',
    'emergencyPhone',
    'practicedBefore',
    'batch',
    'format',
    'language',
    'whyJoin',
    'expectations',
    'consentWellness',
    'consentGuidelines',
];

export async function POST(req) {
    try {
        // Server-side gate — the frontend already hides this page from
        // signed-out users, but the API must not trust that alone.
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: 'You must be signed in to submit a booking.' },
                { status: 401 }
            );
        }

        const body = await req.json();

        const missing = REQUIRED_FIELDS.filter((field) => {
            const value = body[field];
            return value === undefined || value === null || value === '';
        });

        if (missing.length > 0) {
            return NextResponse.json(
                { error: `Missing required field(s): ${missing.join(', ')}` },
                { status: 400 }
            );
        }

        if (!body.consentWellness || !body.consentGuidelines) {
            return NextResponse.json(
                { error: 'You must accept the wellness notice and class guidelines.' },
                { status: 400 }
            );
        }

        await connectDB();

        const booking = await Booking.create({
            ...body,
            user: session.user.id,
        });

        return NextResponse.json({ success: true, bookingId: booking._id }, { status: 201 });
    } catch (err) {
        console.error('Booking creation error:', err);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}

// Lets a signed-in user fetch their own bookings, e.g. for a "my bookings" page later.
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: 'You must be signed in to view bookings.' },
                { status: 401 }
            );
        }

        await connectDB();

        const bookings = await Booking.find({ user: session.user.id }).sort({
            createdAt: -1,
        });

        return NextResponse.json({ bookings });
    } catch (err) {
        console.error('Booking fetch error:', err);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}