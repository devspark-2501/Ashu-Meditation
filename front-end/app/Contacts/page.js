'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, Clock, ArrowRight } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/919765080938';

/* ---------------------------------------------
   Shared motion variants
--------------------------------------------- */
const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
};

/* ---------------------------------------------
   Floating background blobs
--------------------------------------------- */
function BackgroundBlobs() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <motion.div
                aria-hidden
                className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#5FB878]/25 blur-3xl"
                animate={prefersReducedMotion ? undefined : { x: [0, 30, 0], y: [0, 24, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                aria-hidden
                className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#0E5D37]/10 blur-3xl"
                animate={prefersReducedMotion ? undefined : { x: [0, -26, 0], y: [0, 32, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                aria-hidden
                className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#5FB878]/20 blur-3xl"
                animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], y: [0, -18, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
}

/* ---------------------------------------------
   Inline WhatsApp glyph (brand icon, kept local
   so this file has no extra icon dependency)
--------------------------------------------- */
function WhatsAppIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z" />
            <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2z" />
        </svg>
    );
}

/* ---------------------------------------------
   Reusable contact card
--------------------------------------------- */
function ContactCard({ icon, title, children }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-[#0E5D37]/10 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0E5D37]/10"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5FB878]/15">
                {icon}
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#0E5D37]">{title}</h3>
            <div className="mt-2 text-sm leading-relaxed text-gray-600">{children}</div>
        </motion.div>
    );
}

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function Contacts() {
    return (
        <div className="bg-white">
            {/* ── HERO ── */}
            <section className="relative overflow-hidden px-6 py-24 text-center md:px-16 md:py-32">
                <BackgroundBlobs />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mx-auto max-w-2xl"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl font-bold leading-[1.15] tracking-tight text-[#0E5D37] md:text-6xl"
                    >
                        Let&apos;s Begin Your Meditation Journey
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-gray-600"
                    >
                        We&apos;d love to help you take your first step toward greater
                        focus, calmness, and personal growth.
                    </motion.p>
                </motion.div>
            </section>

            {/* ── MAIN CONTACT CARD ── */}
            <section className="px-6 py-16 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mx-auto max-w-3xl rounded-3xl border border-[#0E5D37]/10 bg-white/70 p-8 text-center shadow-[0_8px_40px_rgba(14,93,55,0.08)] backdrop-blur-xl md:p-12"
                >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#5FB878] to-[#0E5D37] text-2xl font-bold text-white shadow-md">
                        A
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-[#0E5D37]">Ashu</h2>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-[#5FB878]">
                        Online Meditation Classes
                    </p>
                    <p className="mx-auto mt-5 max-w-xl leading-relaxed text-gray-600">
                        Join today and begin your journey toward greater focus, inner
                        awareness, and personal growth.
                    </p>
                </motion.div>
            </section>

            {/* ── CONTACT METHODS ── */}
            <section className="px-6 py-16 md:px-16">
                <motion.div
                    className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {/* Phone / WhatsApp */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl border border-[#0E5D37]/10 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-[#5FB878]/25"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5FB878]/15">
                            <WhatsAppIcon className="h-6 w-6 text-[#0E5D37]" />
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-[#0E5D37]">Phone</h3>
                        <p className="mt-2 text-sm text-gray-600">+91 97650 80938</p>

                        <motion.a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0E5D37]/20 transition-colors group-hover:bg-[#0a4429]"
                        >
                            <WhatsAppIcon className="h-4 w-4" />
                            Chat on WhatsApp
                        </motion.a>
                    </motion.div>

                    <ContactCard
                        icon={<Globe2 className="h-6 w-6 text-[#0E5D37]" strokeWidth={1.7} />}
                        title="Location"
                    >
                        Online Worldwide
                        <br />
                        Join live from anywhere in the world.
                    </ContactCard>

                    <ContactCard
                        icon={<Clock className="h-6 w-6 text-[#0E5D37]" strokeWidth={1.7} />}
                        title="Availability"
                    >
                        Live Guided Sessions
                        <br />
                        Personal guidance throughout the course.
                    </ContactCard>
                </motion.div>
            </section>

            {/* ── LARGE CTA ── */}
            <section className="relative overflow-hidden px-6 py-24 text-center md:px-16 md:py-32">
                <BackgroundBlobs />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative mx-auto max-w-2xl"
                >
                    <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-10 py-5 text-lg font-medium text-white shadow-xl shadow-[#0E5D37]/25 transition-colors hover:bg-[#0a4429]"
                    >
                        Book Your Online Meditation Class Today
                        <ArrowRight className="h-5 w-5" />
                    </motion.a>
                </motion.div>
            </section>

            {/* ── FOOTER QUOTE ── */}
            <section className="px-6 pb-20 text-center md:px-16">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-xl text-sm italic text-gray-500"
                >
                    &ldquo;The journey of a thousand peaceful moments begins with a
                    single breath.&rdquo;
                </motion.p>
            </section>
        </div>
    );
}