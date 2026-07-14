'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    User,
    PhoneCall,
    Flower2,
    HeartPulse,
    CalendarClock,
    Target,
    ShieldCheck,
    CreditCard,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Loader2,
    Upload,
} from 'lucide-react';

/* ---------------------------------------------
   Step configuration — one entry per section
--------------------------------------------- */
const STEPS = [
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
            {
                name: 'practiceDuration',
                label: 'If yes, for how long?',
                type: 'text',
                condition: (d) => d.practicedBefore === 'Yes',
            },
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
            {
                name: 'consentWellness',
                label: 'I understand that meditation is a wellness practice and not a substitute for medical treatment.',
                type: 'checkbox',
                required: true,
            },
            {
                name: 'consentGuidelines',
                label: 'I agree to follow the class guidelines.',
                type: 'checkbox',
                required: true,
            },
            {
                name: 'consentUpdates',
                label: 'I consent to receive class updates via email/WhatsApp/SMS.',
                type: 'checkbox',
            },
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

/* ---------------------------------------------
   Field renderer
--------------------------------------------- */
function Field({ field, value, onChange }) {
    const baseInput =
        'w-full rounded-xl border border-[#0E5D37]/15 bg-white/80 px-4 py-3 text-sm text-[#1E1E1E] placeholder:text-gray-400 transition-colors focus:border-[#0E5D37] focus:outline-none focus:ring-2 focus:ring-[#0E5D37]/20';

    if (field.type === 'textarea') {
        return (
            <textarea
                rows={3}
                required={field.required}
                placeholder={field.placeholder}
                value={value || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={`${baseInput} resize-none`}
            />
        );
    }

    if (field.type === 'select') {
        return (
            <select
                required={field.required}
                value={value || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={baseInput}
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
                                    ? 'border-[#0E5D37] bg-[#0E5D37] text-white shadow-sm'
                                    : 'border-[#0E5D37]/15 bg-white/70 text-[#1E1E1E]/80 hover:border-[#0E5D37]/40'
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
                    className="mt-1 h-4 w-4 shrink-0 rounded border-[#0E5D37]/30 text-[#0E5D37] focus:ring-[#0E5D37]/30"
                />
                <span className="text-sm leading-relaxed text-gray-600">
                    {field.label}
                </span>
            </label>
        );
    }

    if (field.type === 'file') {
        return (
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#0E5D37]/25 bg-white/60 px-4 py-4 text-sm text-gray-500 transition-colors hover:border-[#0E5D37]/50">
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
            className={baseInput}
        />
    );
}

/* ---------------------------------------------
   Auth-gated wrapper
--------------------------------------------- */
function AuthGate({ children }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login?callbackUrl=/booking');
        }
    }, [status, router]);

    if (status === 'loading' || status === 'unauthenticated') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3 text-[#0E5D37]">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <p className="text-sm text-gray-500">
                        {status === 'loading' ? 'Checking your session…' : 'Redirecting to sign in…'}
                    </p>
                </div>
            </div>
        );
    }

    return children;
}

/* ---------------------------------------------
   Main form
--------------------------------------------- */
function BookingForm() {
    const [stepIndex, setStepIndex] = useState(0);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [direction, setDirection] = useState(1);

    const step = STEPS[stepIndex];
    const totalSteps = STEPS.length;
    const progress = ((stepIndex + 1) / totalSteps) * 100;

    const visibleFields = step.fields.filter(
        (f) => !f.condition || f.condition(formData)
    );

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isStepValid = visibleFields.every(
        (f) => !f.required || (f.type === 'checkbox' ? !!formData[f.name] : !!formData[f.name])
    );

    const goNext = () => {
        if (!isStepValid) return;
        setDirection(1);
        if (stepIndex < totalSteps - 1) {
            setStepIndex((s) => s + 1);
        } else {
            handleSubmit();
        }
    };

    const goBack = () => {
        setDirection(-1);
        setStepIndex((s) => Math.max(0, s - 1));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // TODO: wire this up to a real booking API route once the backend exists.
        await new Promise((resolve) => setTimeout(resolve, 900));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const Icon = step.icon;

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-[#0E5D37]/10 bg-white/80 p-10 text-center shadow-[0_8px_40px_rgba(14,93,55,0.1)] backdrop-blur-xl"
            >
                <CheckCircle2 className="h-14 w-14 text-[#5FB878]" strokeWidth={1.5} />
                <h2 className="text-2xl font-bold text-[#0E5D37]">
                    Booking Received!
                </h2>
                <p className="text-gray-600">
                    Thank you for registering. We&apos;ll reach out with your batch
                    details and next steps shortly.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-2xl">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between text-sm font-medium text-[#0E5D37]">
                    <span>
                        Step {stepIndex + 1} of {totalSteps}
                    </span>
                    <span>{step.title}</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#0E5D37]/10">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#5FB878] to-[#0E5D37]"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl border border-[#0E5D37]/10 bg-white/70 p-8 shadow-[0_8px_40px_rgba(14,93,55,0.08)] backdrop-blur-xl md:p-10">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={stepIndex}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -24 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5FB878]/15">
                                <Icon className="h-5 w-5 text-[#0E5D37]" strokeWidth={1.7} />
                            </div>
                            <h2 className="text-xl font-bold text-[#0E5D37]">
                                {step.title}
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {visibleFields.map((field) => (
                                <div key={field.name}>
                                    {field.type !== 'checkbox' && (
                                        <label className="mb-2 block text-sm font-medium text-[#1E1E1E]/80">
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
                    </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="mt-10 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={goBack}
                        disabled={stepIndex === 0}
                        className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-[#0E5D37] transition-colors hover:bg-[#0E5D37]/5 disabled:cursor-not-allowed disabled:opacity-0"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </button>

                    <motion.button
                        type="button"
                        onClick={goNext}
                        disabled={!isStepValid || isSubmitting}
                        whileHover={isStepValid ? { y: -2 } : undefined}
                        whileTap={isStepValid ? { scale: 0.98 } : undefined}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#0E5D37]/20 transition-colors hover:bg-[#0a4429] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : stepIndex === totalSteps - 1 ? (
                            'Submit Booking'
                        ) : (
                            <>
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </>
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Step dots */}
            <div className="mt-6 flex justify-center gap-2">
                {STEPS.map((s, i) => (
                    <span
                        key={s.title}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === stepIndex
                                ? 'w-6 bg-[#0E5D37]'
                                : i < stepIndex
                                ? 'w-1.5 bg-[#5FB878]'
                                : 'w-1.5 bg-[#0E5D37]/15'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function BookingPage() {
    return (
        <AuthGate>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#5FB878]/10 via-white to-white px-6 py-28 md:px-16">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#5FB878]/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-[#0E5D37]/10 blur-3xl" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <h1 className="text-3xl font-bold text-[#0E5D37] md:text-5xl">
                        Book Your Meditation Class
                    </h1>
                    <p className="mt-4 text-gray-600">
                        A few details help us personalize your practice and take care
                        of you properly.
                    </p>
                </motion.div>

                <BookingForm />
            </div>
        </AuthGate>
    );
}