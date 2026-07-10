'use client';

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
   Data
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
   Page
--------------------------------------------- */
export default function Classes() {
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
                            href="#weeks"
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
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70"
                                        >
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
                        href="#"
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
        </div>
    );
}