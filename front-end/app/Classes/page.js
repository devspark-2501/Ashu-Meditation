'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Phone,
    HeartPulse,
    ClipboardList,
    Target,
    ShieldCheck,
    CreditCard,
    MessageCircle,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';

/* ---------------------------------------------
   Motion
--------------------------------------------- */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ---------------------------------------------
   Section shell
--------------------------------------------- */
type SectionProps = {
    number: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

function Section({ number, icon: Icon, title, subtitle, children }: SectionProps) {
    return (
        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-3xl border border-[#0E5D37]/10 bg-white p-7 shadow-sm md:p-9"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5FB878]/15">
                    <Icon className="h-5 w-5 text-[#0E5D37]" strokeWidth={1.8} />
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#5FB878]">
                        Step {number}
                    </p>
                    <h2 className="text-xl font-bold text-[#0E5D37] md:text-2xl">{title}</h2>
                    <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                </div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
        </motion.section>
    );
}

/* ---------------------------------------------
   Field primitives
--------------------------------------------- */
const inputClass =
    'w-full rounded-xl border border-[#0E5D37]/15 bg-[#FAFDFB] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-[#5FB878] focus:ring-2 focus:ring-[#5FB878]/25';

function Field({
    label,
    required,
    full,
    children,
}: {
    label: string;
    required?: boolean;
    full?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
            <span className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="ml-1 text-[#3FA06A]">*</span>}
                {!required && <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>}
            </span>
            {children}
        </label>
    );
}

/* ---------------------------------------------
   Form data
--------------------------------------------- */
type FormData = {
    fullName: string;
    dob: string;
    gender: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    emergencyName: string;
    emergencyRelationship: string;
    emergencyPhone: string;
    practicedBefore: string;
    practiceDuration: string;
    priorCourses: string;
    medicalConditions: string;
    mentalHealthNotes: string;
    medications: string;
    accessibilityNeeds: string;
    batch: string;
    format: string;
    language: string;
    reason: string;
    expectations: string;
    consentWellness: boolean;
    consentGuidelines: boolean;
    consentUpdates: boolean;
    paymentStatus: string;
    transactionId: string;
    couponCode: string;
    hearAboutUs: string;
    referredBy: string;
    comments: string;
};

const initialData: FormData = {
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    practicedBefore: '',
    practiceDuration: '',
    priorCourses: '',
    medicalConditions: '',
    mentalHealthNotes: '',
    medications: '',
    accessibilityNeeds: '',
    batch: '',
    format: '',
    language: '',
    reason: '',
    expectations: '',
    consentWellness: false,
    consentGuidelines: false,
    consentUpdates: false,
    paymentStatus: '',
    transactionId: '',
    couponCode: '',
    hearAboutUs: '',
    referredBy: '',
    comments: '',
};

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function EnrollmentForm() {
    const [data, setData] = useState<FormData>(initialData);
    const [receiptName, setReceiptName] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setData((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.fullName || !data.phone || !data.email) {
            setError('Please fill in your name, phone number, and email.');
            return;
        }
        if (!data.consentWellness || !data.consentGuidelines) {
            setError('Please accept the wellness notice and class guidelines to continue.');
            return;
        }

        setError('');
        // In a real app, this is where the data would be sent to the server
        // for the admin to review (e.g. POST to an API route / database).
        console.log('Enrollment submitted:', data, { receiptName });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-[#5FB878]/10 via-white to-white px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="max-w-md rounded-3xl border border-[#0E5D37]/10 bg-white p-10 text-center shadow-sm"
                >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5FB878]/15">
                        <CheckCircle2 className="h-7 w-7 text-[#0E5D37]" strokeWidth={1.8} />
                    </div>
                    <h1 className="mt-5 text-2xl font-bold text-[#0E5D37]">You're enrolled</h1>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        Thanks, {data.fullName.split(' ')[0] || 'friend'}. We've received your
                        details and our team will confirm your batch shortly by email or
                        WhatsApp.
                    </p>
                    <button
                        onClick={() => {
                            setData(initialData);
                            setReceiptName('');
                            setSubmitted(false);
                        }}
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0a4429]"
                    >
                        Submit another response
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* ── HEADER ── */}
            <section className="bg-gradient-to-b from-[#5FB878]/10 via-white to-white px-6 py-16 text-center md:px-16 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mx-auto max-w-2xl"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-[#0E5D37] md:text-5xl">
                        Class Enrollment Form
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                        Tell us a little about yourself so we can place you in the right
                        batch and support your practice properly. Fields marked with{' '}
                        <span className="text-[#3FA06A]">*</span> are required.
                    </p>
                </motion.div>
            </section>

            {/* ── FORM ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl space-y-6 px-6 pb-24 md:px-16"
            >
                <Section
                    number="1"
                    icon={User}
                    title="Personal Information"
                    subtitle="The basics we need to reach you and know who's joining."
                >
                    <Field label="Full name" required full>
                        <input
                            className={inputClass}
                            value={data.fullName}
                            onChange={(e) => update('fullName', e.target.value)}
                            placeholder="Jane Doe"
                        />
                    </Field>
                    <Field label="Date of birth">
                        <input
                            type="date"
                            className={inputClass}
                            value={data.dob}
                            onChange={(e) => update('dob', e.target.value)}
                        />
                    </Field>
                    <Field label="Gender">
                        <select
                            className={inputClass}
                            value={data.gender}
                            onChange={(e) => update('gender', e.target.value)}
                        >
                            <option value="">Prefer not to select</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="nonbinary">Non-binary</option>
                            <option value="self-describe">Self-describe</option>
                        </select>
                    </Field>
                    <Field label="Phone number" required>
                        <input
                            type="tel"
                            className={inputClass}
                            value={data.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            placeholder="+1 555 123 4567"
                        />
                    </Field>
                    <Field label="Email address" required>
                        <input
                            type="email"
                            className={inputClass}
                            value={data.email}
                            onChange={(e) => update('email', e.target.value)}
                            placeholder="jane@example.com"
                        />
                    </Field>
                    <Field label="City">
                        <input
                            className={inputClass}
                            value={data.city}
                            onChange={(e) => update('city', e.target.value)}
                        />
                    </Field>
                    <Field label="Country">
                        <input
                            className={inputClass}
                            value={data.country}
                            onChange={(e) => update('country', e.target.value)}
                        />
                    </Field>
                </Section>

                <Section
                    number="2"
                    icon={Phone}
                    title="Emergency Contact"
                    subtitle="Someone we can reach if we're ever concerned about you."
                >
                    <Field label="Contact name">
                        <input
                            className={inputClass}
                            value={data.emergencyName}
                            onChange={(e) => update('emergencyName', e.target.value)}
                        />
                    </Field>
                    <Field label="Relationship">
                        <input
                            className={inputClass}
                            value={data.emergencyRelationship}
                            onChange={(e) => update('emergencyRelationship', e.target.value)}
                            placeholder="Spouse, parent, friend..."
                        />
                    </Field>
                    <Field label="Phone number" full>
                        <input
                            type="tel"
                            className={inputClass}
                            value={data.emergencyPhone}
                            onChange={(e) => update('emergencyPhone', e.target.value)}
                        />
                    </Field>
                </Section>

                <Section
                    number="3"
                    icon={ClipboardList}
                    title="Meditation Background"
                    subtitle="Helps us calibrate the pace of your first few sessions."
                >
                    <Field label="Have you practiced meditation before?" full>
                        <div className="flex gap-3">
                            {['Yes', 'No'].map((opt) => (
                                <button
                                    type="button"
                                    key={opt}
                                    onClick={() => update('practicedBefore', opt)}
                                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                                        data.practicedBefore === opt
                                            ? 'border-[#0E5D37] bg-[#0E5D37] text-white'
                                            : 'border-[#0E5D37]/20 bg-white text-gray-600 hover:border-[#5FB878]'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </Field>
                    {data.practicedBefore === 'Yes' && (
                        <Field label="For how long?">
                            <input
                                className={inputClass}
                                value={data.practiceDuration}
                                onChange={(e) => update('practiceDuration', e.target.value)}
                                placeholder="e.g. 6 months"
                            />
                        </Field>
                    )}
                    <Field label="Prior meditation courses attended" full>
                        <input
                            className={inputClass}
                            value={data.priorCourses}
                            onChange={(e) => update('priorCourses', e.target.value)}
                            placeholder="Course name, teacher, or 'none'"
                        />
                    </Field>
                </Section>

                <Section
                    number="4"
                    icon={HeartPulse}
                    title="Health Information"
                    subtitle="Shared only with your instructor, to keep your practice safe."
                >
                    <Field label="Medical conditions" full>
                        <textarea
                            className={`${inputClass} min-h-[80px] resize-y`}
                            value={data.medicalConditions}
                            onChange={(e) => update('medicalConditions', e.target.value)}
                        />
                    </Field>
                    <Field label="Mental health concerns your instructor should know about" full>
                        <textarea
                            className={`${inputClass} min-h-[80px] resize-y`}
                            value={data.mentalHealthNotes}
                            onChange={(e) => update('mentalHealthNotes', e.target.value)}
                        />
                    </Field>
                    <Field label="Current medications">
                        <input
                            className={inputClass}
                            value={data.medications}
                            onChange={(e) => update('medications', e.target.value)}
                        />
                    </Field>
                    <Field label="Mobility or accessibility requirements">
                        <input
                            className={inputClass}
                            value={data.accessibilityNeeds}
                            onChange={(e) => update('accessibilityNeeds', e.target.value)}
                        />
                    </Field>
                </Section>

                <Section
                    number="5"
                    icon={Target}
                    title="Course Preferences"
                    subtitle="So we can place you in a batch that fits your life."
                >
                    <Field label="Preferred batch" required>
                        <select
                            className={inputClass}
                            value={data.batch}
                            onChange={(e) => update('batch', e.target.value)}
                        >
                            <option value="">Select a batch</option>
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                            <option value="weekend">Weekend</option>
                        </select>
                    </Field>
                    <Field label="Format" required>
                        <select
                            className={inputClass}
                            value={data.format}
                            onChange={(e) => update('format', e.target.value)}
                        >
                            <option value="">Select a format</option>
                            <option value="online">Online</option>
                            <option value="in-person">In-person</option>
                        </select>
                    </Field>
                    <Field label="Language preference" full>
                        <input
                            className={inputClass}
                            value={data.language}
                            onChange={(e) => update('language', e.target.value)}
                        />
                    </Field>
                </Section>

                <Section
                    number="6"
                    icon={Target}
                    title="Your Goals"
                    subtitle="Tell us what brought you here."
                >
                    <Field label="Why do you want to join this class?" required full>
                        <textarea
                            className={`${inputClass} min-h-[90px] resize-y`}
                            value={data.reason}
                            onChange={(e) => update('reason', e.target.value)}
                        />
                    </Field>
                    <Field label="What are your expectations from the course?" full>
                        <textarea
                            className={`${inputClass} min-h-[90px] resize-y`}
                            value={data.expectations}
                            onChange={(e) => update('expectations', e.target.value)}
                        />
                    </Field>
                </Section>

                <Section
                    number="7"
                    icon={ShieldCheck}
                    title="Consent"
                    subtitle="Please read and confirm before enrolling."
                >
                    <label className="flex items-start gap-3 sm:col-span-2">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 shrink-0 rounded border-[#0E5D37]/30 text-[#0E5D37] focus:ring-[#5FB878]"
                            checked={data.consentWellness}
                            onChange={(e) => update('consentWellness', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700">
                            I understand that meditation is a wellness practice and not a
                            substitute for medical treatment.
                            <span className="ml-1 text-[#3FA06A]">*</span>
                        </span>
                    </label>
                    <label className="flex items-start gap-3 sm:col-span-2">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 shrink-0 rounded border-[#0E5D37]/30 text-[#0E5D37] focus:ring-[#5FB878]"
                            checked={data.consentGuidelines}
                            onChange={(e) => update('consentGuidelines', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700">
                            I agree to follow the class guidelines.
                            <span className="ml-1 text-[#3FA06A]">*</span>
                        </span>
                    </label>
                    <label className="flex items-start gap-3 sm:col-span-2">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 shrink-0 rounded border-[#0E5D37]/30 text-[#0E5D37] focus:ring-[#5FB878]"
                            checked={data.consentUpdates}
                            onChange={(e) => update('consentUpdates', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700">
                            I consent to receive class updates via email, WhatsApp, or SMS.
                        </span>
                    </label>
                </Section>

                <Section
                    number="8"
                    icon={CreditCard}
                    title="Payment"
                    subtitle="If a fee applies to your batch, share the details here."
                >
                    <Field label="Payment status">
                        <select
                            className={inputClass}
                            value={data.paymentStatus}
                            onChange={(e) => update('paymentStatus', e.target.value)}
                        >
                            <option value="">Select status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="not-applicable">Not applicable</option>
                        </select>
                    </Field>
                    <Field label="Coupon code">
                        <input
                            className={inputClass}
                            value={data.couponCode}
                            onChange={(e) => update('couponCode', e.target.value)}
                        />
                    </Field>
                    <Field label="Transaction ID">
                        <input
                            className={inputClass}
                            value={data.transactionId}
                            onChange={(e) => update('transactionId', e.target.value)}
                        />
                    </Field>
                    <Field label="Receipt upload">
                        <input
                            type="file"
                            className="w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#5FB878]/15 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#0E5D37] hover:file:bg-[#5FB878]/25"
                            onChange={(e) => setReceiptName(e.target.files?.[0]?.name ?? '')}
                        />
                        {receiptName && (
                            <span className="text-xs text-gray-500">{receiptName}</span>
                        )}
                    </Field>
                </Section>

                <Section
                    number="9"
                    icon={MessageCircle}
                    title="A Few More Things"
                    subtitle="Optional, but it helps us grow and serve you better."
                >
                    <Field label="How did you hear about us?">
                        <input
                            className={inputClass}
                            value={data.hearAboutUs}
                            onChange={(e) => update('hearAboutUs', e.target.value)}
                        />
                    </Field>
                    <Field label="Referred by">
                        <input
                            className={inputClass}
                            value={data.referredBy}
                            onChange={(e) => update('referredBy', e.target.value)}
                        />
                    </Field>
                    <Field label="Questions or comments" full>
                        <textarea
                            className={`${inputClass} min-h-[80px] resize-y`}
                            value={data.comments}
                            onChange={(e) => update('comments', e.target.value)}
                        />
                    </Field>
                </Section>

                {error && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </p>
                )}

                <motion.button
                    type="submit"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0E5D37] px-8 py-4 text-lg font-medium text-white shadow-lg shadow-[#0E5D37]/20 transition-colors hover:bg-[#0a4429]"
                >
                    Submit Enrollment
                    <ArrowRight className="h-5 w-5" />
                </motion.button>
            </form>
        </div>
    );
}