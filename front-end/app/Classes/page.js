'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Flower2,
    Eye,
    Sparkles,
    Wand2,
    ArrowRight,
    Target,
    Wind,
    Moon,
    Brain,
    CalendarCheck,
    User,
    PhoneCall,
    HeartPulse,
    CalendarClock,
    ShieldCheck,
    CreditCard,
    MessageSquare,
    CheckCircle2,
    X,
    Lock,
    Upload,
    Phone,
    Mail,
} from 'lucide-react';

/* ---------------------------------------------
   Shared motion variants
--------------------------------------------- */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
};

/* ---------------------------------------------
   Week timeline data
--------------------------------------------- */
const WEEKS = [
    {
        number: '01',
        icon: Flower2,
        title: 'Foundation of Meditation',
        desc: 'Build the groundwork your entire practice will stand on.',
        topics: [
            'Learn the correct sitting posture.',
            'Learn how to observe and gradually reduce distracting thoughts.',
            'Build a strong foundation for meditation.',
        ],
        accent: '#5FB878',
        tint: '#EAFBF1',
    },
    {
        number: '02',
        icon: Eye,
        title: 'Forehead Focus & Hand Awareness',
        desc: 'Sharpen attention with two classic concentration techniques.',
        topics: [
            'Focus at the center of the forehead.',
            'Improve concentration.',
            'Practice hand awareness meditation.',
        ],
        accent: '#3FA06A',
        tint: '#DFF6E8',
    },
    {
        number: '03',
        icon: Sparkles,
        title: 'Visualization & Tai Chi Ball Preparation',
        desc: 'Train the mind\u2019s eye and prepare for advanced practice.',
        topics: [
            'Guided visualization.',
            'Mental imagery.',
            'Tai Chi Ball preparation.',
        ],
        accent: '#22815A',
        tint: '#D6F0E2',
    },
    {
        number: '04',
        icon: Wand2,
        title: 'Complete Tai Chi Ball Meditation',
        desc: 'Bring every technique together into one complete practice.',
        topics: [
            'Learn the complete Tai Chi Ball meditation.',
            'Combine posture, forehead focus, and hand awareness.',
            'Add visualization and continue daily practice.',
        ],
        accent: '#0E5D37',
        tint: '#CDEBDC',
    },
];

const BENEFITS = [
    { icon: Target, label: 'Improved Focus' },
    { icon: Wind, label: 'Reduced Stress' },
    { icon: Moon, label: 'Better Sleep' },
    { icon: Brain, label: 'Calm Mind' },
    { icon: Sparkles, label: 'Mental Clarity' },
    { icon: CalendarCheck, label: 'Daily Practice Habit' },
];

/* ---------------------------------------------
   Booking form config — same questions as the
   brief, now living on this page instead of a
   separate /booking route
--------------------------------------------- */
const SECTIONS = [
    {
        title: 'Personal Information',
        icon: User,
        fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true },
            { name: 'dob', label: 'Date of Birth or Age', type: 'text', required: true, placeholder: 'e.g. 14/07/1994 or 32' },
            { name: 'gender', label: 'Gender (optional)', type: 'select', options: ['Prefer not to say', 'Female', 'Male', 'Non-binary', 'Other'] },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'location', label: 'City and Country', type: 'text', required: true },
        ],
    },
    {
        title: 'Emergency Contact',
        icon: PhoneCall,
        fields: [
            { name: 'emergencyName', label: 'Emergency Contact Name', type: 'text', required: true },
            { name: 'emergencyRelation', label: 'Relationship', type: 'text', required: true },
            { name: 'emergencyPhone', label: 'Phone Number', type: 'tel', required: true },
        ],
    },
    {
        title: 'Meditation Background',
        icon: Flower2,
        fields: [
            { name: 'practicedBefore', label: 'Have you practiced meditation before?', type: 'radio', options: ['Yes', 'No'], required: true },
            { name: 'practiceDuration', label: 'If yes, for how long?', type: 'text', condition: (d) => d.practicedBefore === 'Yes' },
            { name: 'priorCourses', label: 'Have you attended any meditation courses previously?', type: 'radio', options: ['Yes', 'No'] },
        ],
    },
    {
        title: 'Health Information',
        icon: HeartPulse,
        fields: [
            { name: 'medicalConditions', label: 'Any medical conditions (optional)', type: 'textarea' },
            { name: 'mentalHealth', label: 'Any mental health concerns you would like the instructor to know about (optional)', type: 'textarea' },
            { name: 'medications', label: 'Current medications (optional)', type: 'textarea' },
            { name: 'accessibility', label: 'Mobility or accessibility requirements', type: 'textarea' },
        ],
    },
    {
        title: 'Course Preferences',
        icon: CalendarClock,
        fields: [
            { name: 'batch', label: 'Preferred Batch', type: 'select', options: ['Morning', 'Evening', 'Weekend'], required: true },
            { name: 'format', label: 'Online or In-Person', type: 'radio', options: ['Online', 'In-Person'], required: true },
            { name: 'language', label: 'Language Preference', type: 'text', required: true },
        ],
    },
    {
        title: 'Goals',
        icon: Target,
        fields: [
            { name: 'whyJoin', label: 'Why do you want to join the meditation class?', type: 'textarea', required: true },
            { name: 'expectations', label: 'What are your expectations from the course?', type: 'textarea', required: true },
        ],
    },
    {
        title: 'Consent',
        icon: ShieldCheck,
        fields: [
            { name: 'consentWellness', label: 'I understand that meditation is a wellness practice and not a substitute for medical treatment.', type: 'checkbox', required: true },
            { name: 'consentGuidelines', label: 'I agree to follow the class guidelines.', type: 'checkbox', required: true },
            { name: 'consentUpdates', label: 'I consent to receive class updates via email/WhatsApp/SMS.', type: 'checkbox' },
        ],
    },
    {
        title: 'Payment',
        icon: CreditCard,
        fields: [
            { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Not Paid', 'Paid', 'Pending Verification'], required: true },
            { name: 'receipt', label: 'Transaction ID or Receipt Upload', type: 'file' },
            { name: 'coupon', label: 'Coupon Code (optional)', type: 'text' },
        ],
    },
    {
        title: 'Optional',
        icon: MessageSquare,
        fields: [
            { name: 'hearAboutUs', label: 'How did you hear about us?', type: 'text' },
            { name: 'referredBy', label: 'Referred By', type: 'text' },
            { name: 'comments', label: 'Questions or Comments', type: 'textarea' },
        ],
    },
];

const WHY_BOOK = [
    'Personal, step-by-step guidance from Ashu.',
    'Live guided sessions, not pre-recorded videos.',
    'Designed for complete beginners and experienced practitioners alike.',
    'Flexible morning, evening, and weekend batches.',
];

/* ---------------------------------------------
   Background glow used behind the final CTA
--------------------------------------------- */
function FloatingGlow() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5FB878]/30 blur-3xl"
            animate={
                prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
    );
}

/* ---------------------------------------------
   Form field renderer
--------------------------------------------- */
function Field({ field, value, onChange }) {
    const base =
        'w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:border-[#0E5D37] focus:ring-2 focus:ring-[#0E5D37]/10 transition';

    if (field.type === 'textarea') {
        return (
            <textarea
                rows={4}
                required={field.required}
                placeholder={field.placeholder}
                value={value || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={`${base} resize-none`}
            />
        );
    }

    if (field.type === 'select') {
        return (
            <select
                required={field.required}
                value={value || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={base}
            >
                <option value="" disabled>
                    Select an option
                </option>
                {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        );
    }

    if (field.type === 'radio') {
        return (
            <div className="flex flex-wrap gap-3">
                {field.options.map((opt) => {
                    const isActive = value === opt;
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onChange(field.name, opt)}
                            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                                isActive
                                    ? 'border-[#0E5D37] bg-[#0E5D37] text-white'
                                    : 'border-gray-200 bg-white text-[#1E1E1E]/80 hover:border-[#0E5D37]/40'
                            }`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (field.type === 'checkbox') {
        return (
            <label className="flex cursor-pointer items-start gap-3">
                <input
                    type="checkbox"
                    required={field.required}
                    checked={!!value}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#0E5D37] focus:ring-[#0E5D37]/30"
                />
                <span className="text-sm leading-relaxed text-gray-600">
                    {field.label}
                </span>
            </label>
        );
    }

    if (field.type === 'file') {
        return (
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-4 text-sm text-gray-500 transition-colors hover:border-[#0E5D37]/50">
                <Upload className="h-4 w-4 shrink-0 text-[#0E5D37]" />
                <span className="truncate">
                    {value?.name || 'Upload receipt or enter transaction ID above'}
                </span>
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
                />
            </label>
        );
    }

    return (
        <input
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={base}
        />
    );
}

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function Classes() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // TODO: replace with a real POST to your booking API route once it exists.
        await new Promise((resolve) => setTimeout(resolve, 900));

        setLoading(false);
        setShowSuccess(true);
        setFormData({});
    };

    const closeSuccess = () => setShowSuccess(false);

    return (
        <div className="bg-white">
            {/* ── HERO ── */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#5FB878]/10 via-white to-white px-6 py-24 text-center md:px-16 md:py-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mx-auto max-w-3xl"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl font-bold leading-[1.15] tracking-tight text-[#0E5D37] md:text-6xl"
                    >
                        4-Week Meditation Mastery Program
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
                    >
                        A guided, step-by-step path from your first sit to the complete
                        Tai Chi Ball meditation practice.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-9">
                        <motion.a
                            href="#book"
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-9 py-4 text-lg font-medium text-white shadow-lg shadow-[#0E5D37]/20 transition-colors hover:bg-[#0a4429]"
                        >
                            Book Your Class
                            <ArrowRight className="h-5 w-5" />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── WEEK TIMELINE ── */}
            <section id="weeks" className="px-6 py-20 md:px-16 md:py-28">
                <div className="relative mx-auto max-w-3xl">
                    <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-[#0E5D37]/15 md:left-1/2 md:block" />

                    <motion.div
                        className="space-y-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {WEEKS.map(({ number, icon: Icon, title, desc, topics, accent, tint }) => (
                            <motion.div key={number} variants={fadeUp} className="relative">
                                <span
                                    className="absolute left-4 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white shadow md:left-1/2 md:block"
                                    style={{ backgroundColor: accent }}
                                />

                                <div
                                    className="rounded-3xl border p-8 shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-xl md:ml-16"
                                    style={{ backgroundColor: tint, borderColor: `${accent}33` }}
                                >
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span
                                            className="text-4xl font-extrabold"
                                            style={{ color: accent }}
                                        >
                                            {number}
                                        </span>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70">
                                            <Icon
                                                className="h-6 w-6"
                                                style={{ color: accent }}
                                                strokeWidth={1.7}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0E5D37]">
                                            {title}
                                        </h3>
                                    </div>

                                    <p className="mt-4 text-gray-600">{desc}</p>

                                    <ul className="mt-5 space-y-2">
                                        {topics.map((topic) => (
                                            <li
                                                key={topic}
                                                className="flex items-start gap-2 text-sm text-gray-700"
                                            >
                                                <span
                                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                                    style={{ backgroundColor: accent }}
                                                />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── WHAT YOU'LL GAIN ── */}
            <section className="bg-gradient-to-b from-white via-[#5FB878]/5 to-white px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        What You&apos;ll Gain
                    </motion.h2>

                    <motion.div
                        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {BENEFITS.map(({ icon: Icon, label }) => (
                            <motion.div
                                key={label}
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                                className="flex items-center gap-4 rounded-2xl border border-[#0E5D37]/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0E5D37]/10"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5FB878]/15">
                                    <Icon className="h-6 w-6 text-[#0E5D37]" strokeWidth={1.7} />
                                </div>
                                <span className="font-semibold text-[#0E5D37]">
                                    {label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── BOOK YOUR CLASS (embedded form, BookStall-inspired) ── */}
            <section id="book" className="bg-white px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#5FB878]/15 px-5 py-2 font-medium text-[#0E5D37]">
                            <Flower2 className="h-4 w-4" />
                            Class Registration
                        </div>
                        <h2 className="text-3xl font-bold text-[#0E5D37] md:text-5xl">
                            Book Your Class
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
                            A few details help us personalize your practice and take care
                            of you properly throughout the course.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Left: Why Book */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-3xl bg-[#5FB878]/5 p-8 shadow-xl">
                                <h3 className="mb-6 text-2xl font-bold text-[#0E5D37]">
                                    Why Book With Us?
                                </h3>
                                <div className="space-y-5">
                                    {WHY_BOOK.map((point) => (
                                        <div key={point} className="flex gap-3">
                                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#5FB878]" />
                                            <p className="text-gray-600">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Form sections */}
                        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
                            {SECTIONS.map((section, sectionIndex) => {
                                const Icon = section.icon;
                                const visibleFields = section.fields.filter(
                                    (f) => !f.condition || f.condition(formData)
                                );

                                return (
                                    <div
                                        key={section.title}
                                        className="rounded-[32px] border border-[#0E5D37]/10 bg-white p-8 shadow-2xl md:p-10"
                                    >
                                        <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-[#0E5D37]">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5FB878] to-[#0E5D37] text-xs font-bold text-white">
                                                {sectionIndex + 1}
                                            </span>
                                            <Icon className="h-5 w-5" strokeWidth={1.7} />
                                            {section.title}
                                        </h3>

                                        <div className="grid gap-6 md:grid-cols-2">
                                            {visibleFields.map((field) => (
                                                <div
                                                    key={field.name}
                                                    className={
                                                        field.type === 'textarea' ||
                                                        field.type === 'radio' ||
                                                        field.type === 'checkbox' ||
                                                        field.type === 'file'
                                                            ? 'md:col-span-2'
                                                            : ''
                                                    }
                                                >
                                                    {field.type !== 'checkbox' && (
                                                        <label className="mb-2 block font-semibold text-[#0E5D37]">
                                                            {field.label}
                                                            {field.required && (
                                                                <span className="ml-1 text-[#0E5D37]">*</span>
                                                            )}
                                                        </label>
                                                    )}
                                                    <Field
                                                        field={field}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Submit */}
                            <div className="rounded-[32px] border border-[#0E5D37]/10 bg-white p-8 shadow-2xl md:p-10">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#5FB878] to-[#0E5D37] py-4 text-lg font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="h-4 w-4" />
                                            Submit Booking
                                        </>
                                    )}
                                </button>

                                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <Lock className="h-3.5 w-3.5 text-[#5FB878]" />
                                    Your information is kept private and used only for your
                                    booking.
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="relative overflow-hidden bg-[#0E5D37] px-6 py-24 text-center md:px-16 md:py-32">
                <FloatingGlow />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative mx-auto max-w-2xl"
                >
                    <h2 className="text-3xl font-bold text-white md:text-5xl">
                        Ready to Begin Your Meditation Journey?
                    </h2>

                    <motion.a
                        href="#book"
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-medium text-[#0E5D37] shadow-xl transition-colors hover:bg-[#5FB878]/20"
                    >
                        Book Your Class Now
                        <ArrowRight className="h-5 w-5" />
                    </motion.a>
                </motion.div>
            </section>

            {/* ── Backdrop ── */}
            {showSuccess && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={closeSuccess}
                />
            )}

            {/* ── Success panel ── */}
            <div
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
                    showSuccess ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="h-2 w-full bg-gradient-to-r from-[#5FB878] to-[#0E5D37]" />
                <div className="flex justify-end px-6 pt-5">
                    <button
                        onClick={closeSuccess}
                        aria-label="Close"
                        className="p-1 text-gray-400 transition hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center px-8 pb-12 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#5FB878]/20 to-[#0E5D37]/10 shadow-lg">
                        <CheckCircle2 className="h-10 w-10 text-[#5FB878]" />
                    </div>
                    <h2 className="mb-3 text-2xl font-bold leading-snug text-[#0E5D37]">
                        Booking Received!
                    </h2>
                    <p className="mb-8 text-sm leading-relaxed text-gray-600">
                        Thank you for registering. We&apos;ll reach out with your batch
                        details and next steps shortly.
                    </p>
                    <div className="w-full space-y-3 rounded-2xl bg-[#5FB878]/10 p-5 text-left">
                        <a
                            href="tel:+919765080938"
                            className="flex items-center gap-3 font-medium text-[#0E5D37] transition hover:text-[#5FB878]"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow">
                                <Phone className="h-4 w-4 text-[#0E5D37]" />
                            </span>
                            +91 97650 80938
                        </a>
                        <a
                            href="mailto:hello@ashumeditation.com"
                            className="flex items-center gap-3 break-all font-medium text-[#0E5D37] transition hover:text-[#5FB878]"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow">
                                <Mail className="h-4 w-4 text-[#0E5D37]" />
                            </span>
                            hello@ashumeditation.com
                        </a>
                    </div>
                    <button
                        onClick={closeSuccess}
                        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#5FB878] to-[#0E5D37] py-3 font-semibold text-white transition hover:scale-[1.01]"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}