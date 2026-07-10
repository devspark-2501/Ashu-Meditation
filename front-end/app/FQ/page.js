'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
    Target,
    Brain,
    Leaf,
    Heart,
    Sparkles,
    Flower2,
    Sun,
    Globe2,
    Hand,
    Wind,
    Moon,
    Scale,
    GraduationCap,
    Briefcase,
    Building2,
    Home,
    Users,
    Sprout,
    Wifi,
    CalendarDays,
    PlayCircle,
    HeartHandshake,
    ChevronDown,
    ArrowRight,
} from 'lucide-react';

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
        transition: { staggerChildren: 0.1, delayChildren: 0.08 },
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
   Data
--------------------------------------------- */
const REGULAR_BENEFITS = [
    { icon: Target, label: 'Improved Focus' },
    { icon: Brain, label: 'Mental Clarity' },
    { icon: Leaf, label: 'Inner Calm' },
    { icon: Heart, label: 'Emotional Balance' },
    { icon: Sparkles, label: 'Self Awareness' },
    { icon: Flower2, label: 'Patience & Confidence' },
    { icon: Sun, label: 'Mindfulness' },
    { icon: Globe2, label: 'Positive Outlook' },
];

const TAICHI_BENEFITS = [
    { icon: Scale, label: 'Deeper Concentration' },
    { icon: Sparkles, label: 'Mind-Body Awareness' },
    { icon: Hand, label: 'Better Hand Coordination' },
    { icon: Wind, label: 'Increased Relaxation' },
    { icon: Brain, label: 'Enhanced Mindfulness' },
    { icon: Heart, label: 'Emotional Balance' },
    { icon: Flower2, label: 'Stronger Meditation Practice' },
    { icon: Moon, label: 'Inner Peace' },
];

const WHO_CAN_JOIN = [
    { icon: GraduationCap, label: 'Students' },
    { icon: Briefcase, label: 'Professionals' },
    { icon: Building2, label: 'Business Owners' },
    { icon: Home, label: 'Homemakers' },
    { icon: Users, label: 'Senior Citizens' },
    { icon: Sprout, label: 'Beginners' },
];

const CLASS_DETAILS = [
    { icon: Wifi, title: 'Mode', desc: '100% Live Online Classes' },
    { icon: CalendarDays, title: 'Duration', desc: '4 Weeks' },
    { icon: PlayCircle, title: 'Sessions', desc: 'Live Guided Meditation' },
    { icon: HeartHandshake, title: 'Support', desc: 'Personal Guidance Throughout the Course' },
    { icon: Globe2, title: 'Location', desc: 'Learn from anywhere in the world.' },
];

const FAQS = [
    {
        q: 'Do I need previous meditation experience?',
        a: 'No. This course is designed for complete beginners as well as experienced practitioners.',
    },
    {
        q: 'Can I join from any country?',
        a: 'Yes. Our classes are conducted online, so you can join from anywhere with an internet connection.',
    },
    {
        q: 'Will I receive guidance during the course?',
        a: 'Yes. Every session includes live instruction and support throughout the course.',
    },
];

/* ---------------------------------------------
   Reusable benefit card
--------------------------------------------- */
function BenefitCard({ icon: Icon, label }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-[#0E5D37]/10 bg-white/70 p-6 text-center shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0E5D37]/10"
        >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(95,184,120,0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#5FB878]/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon className="h-6 w-6 text-[#0E5D37]" strokeWidth={1.7} />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#0E5D37]">{label}</p>
        </motion.div>
    );
}

/* ---------------------------------------------
   Accordion
--------------------------------------------- */
function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="space-y-4">
            {FAQS.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <motion.div
                        key={item.q}
                        variants={fadeUp}
                        className="overflow-hidden rounded-2xl border border-[#0E5D37]/10 bg-white/70 shadow-sm backdrop-blur-md"
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? -1 : i)}
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                            aria-expanded={isOpen}
                        >
                            <span className="font-semibold text-[#0E5D37]">{item.q}</span>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="shrink-0 text-[#0E5D37]"
                            >
                                <ChevronDown className="h-5 w-5" />
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
                                        {item.a}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function FandQ() {
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
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-gray-600"
                    >
                        Everything you need to know before beginning your meditation
                        journey.
                    </motion.p>
                </motion.div>
            </section>

            {/* ── BENEFITS OF REGULAR MEDITATION ── */}
            <section className="px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        Benefits of Regular Meditation
                    </motion.h2>

                    <motion.div
                        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {REGULAR_BENEFITS.map((b) => (
                            <BenefitCard key={b.label} {...b} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── BENEFITS OF TAI CHI BALL MEDITATION ── */}
            <section className="bg-gradient-to-b from-white via-[#5FB878]/5 to-white px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        Benefits of Tai Chi Ball Meditation
                    </motion.h2>

                    <motion.div
                        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {TAICHI_BENEFITS.map((b) => (
                            <BenefitCard key={b.label} {...b} />
                        ))}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-10 text-center text-sm italic text-gray-500"
                    >
                        Individual experiences vary from person to person.
                    </motion.p>
                </div>
            </section>

            {/* ── WHO CAN JOIN ── */}
            <section className="px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-6xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        Who Can Join?
                    </motion.h2>

                    <motion.div
                        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {WHO_CAN_JOIN.map((b) => (
                            <BenefitCard key={b.label} {...b} />
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0E5D37]/20"
                    >
                        No previous meditation experience is required.
                    </motion.div>
                </div>
            </section>

            {/* ── CLASS DETAILS ── */}
            <section className="bg-gradient-to-b from-white via-[#5FB878]/5 to-white px-6 py-20 md:px-16 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mx-auto max-w-4xl rounded-3xl border border-[#0E5D37]/10 bg-white/70 p-8 shadow-[0_8px_40px_rgba(14,93,55,0.08)] backdrop-blur-xl md:p-12"
                >
                    <h2 className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl">
                        Class Details
                    </h2>

                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        {CLASS_DETAILS.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5FB878]/15">
                                    <Icon className="h-6 w-6 text-[#0E5D37]" strokeWidth={1.7} />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#0E5D37]">{title}</p>
                                    <p className="mt-1 text-sm text-gray-600">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── INTERACTIVE FAQ ── */}
            <section className="px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        Have a Question?
                    </motion.h2>

                    <motion.div
                        className="mt-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        <FaqAccordion />
                    </motion.div>
                </div>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="relative overflow-hidden px-6 py-24 text-center md:px-16 md:py-32">
                <BackgroundBlobs />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative mx-auto max-w-2xl"
                >
                    <h2 className="text-3xl font-bold text-[#0E5D37] md:text-5xl">
                        Ready to Begin Your Meditation Journey?
                    </h2>
                    <p className="mt-5 text-lg text-gray-600">
                        Start building focus, inner awareness, and peace today.
                    </p>

                    <motion.a
                        href="#"
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-10 py-5 text-lg font-medium text-white shadow-xl shadow-[#0E5D37]/25 transition-colors hover:bg-[#0a4429]"
                    >
                        Book Your Class
                        <ArrowRight className="h-5 w-5" />
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}