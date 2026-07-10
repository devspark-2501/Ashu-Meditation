'use client';

import { useReducedMotion, motion } from 'framer-motion';
import {
    Quote,
    BookOpen,
    Target,
    Leaf,
    Heart,
    ArrowRight,
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
   Slow-moving background blobs
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
   Inline lotus illustration (no image assets)
--------------------------------------------- */
function LotusIllustration() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="relative flex w-full max-w-md items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(95,184,120,0.45)_0%,rgba(95,184,120,0.12)_55%,transparent_75%)] blur-2xl" />

            <motion.svg
                viewBox="0 0 200 200"
                className="relative h-64 w-64 drop-shadow-xl"
                animate={
                    prefersReducedMotion
                        ? undefined
                        : { y: [0, -14, 0], rotate: [0, 1.5, 0, -1.5, 0] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <ellipse
                        key={angle}
                        cx="100"
                        cy="70"
                        rx="16"
                        ry="42"
                        fill="url(#petalGradient)"
                        opacity="0.9"
                        transform={`rotate(${angle} 100 100)`}
                    />
                ))}
                <circle cx="100" cy="100" r="16" fill="#0E5D37" />
                <defs>
                    <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5FB878" />
                        <stop offset="100%" stopColor="#0E5D37" />
                    </linearGradient>
                </defs>
            </motion.svg>
        </div>
    );
}

/* ---------------------------------------------
   Data
--------------------------------------------- */
const FEATURES = [
    {
        icon: BookOpen,
        title: 'Structured Learning',
        desc: 'A clear, step-by-step path from your very first sit to advanced practice.',
    },
    {
        icon: Target,
        title: 'Improve Concentration',
        desc: 'Techniques that sharpen focus and quiet a wandering mind.',
    },
    {
        icon: Leaf,
        title: 'Build Inner Awareness',
        desc: 'Develop a deeper, calmer relationship with your own thoughts.',
    },
    {
        icon: Heart,
        title: 'Personal Guidance',
        desc: 'Direct support so you always feel confident in your practice.',
    },
];

const JOURNEY = [
    { week: 'Week 1', desc: 'Learn posture and the foundations of stillness.' },
    { week: 'Week 2', desc: 'Sharpen focus with forehead and hand-awareness practice.' },
    { week: 'Week 3', desc: 'Explore guided visualization and mental imagery.' },
    { week: 'Week 4', desc: 'Bring it all together with the complete practice.' },
];

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function About() {
    return (
        <div className="bg-white">
            {/* ── HERO ── */}
            <section className="relative overflow-hidden px-6 py-24 md:px-16 md:py-32">
                <BackgroundBlobs />

                <motion.div
                    className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <div>
                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl font-bold leading-[1.15] tracking-tight text-[#0E5D37] md:text-6xl"
                        >
                            Transform Your Mind.
                            <br />
                            Discover Your Inner Focus.
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600"
                        >
                            Meditation is a practical, trainable skill — a way to quiet the
                            noise, sharpen your attention, and build a calmer relationship
                            with your own mind, one sit at a time.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
                            <motion.a
                                href="#about-ashu"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                className="inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-8 py-4 font-medium text-white shadow-lg shadow-[#0E5D37]/20 transition-colors hover:bg-[#0a4429]"
                            >
                                Meet Your Guide
                            </motion.a>
                            <motion.a
                                href="#journey"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                className="inline-flex items-center gap-2 rounded-full border border-[#0E5D37]/20 px-6 py-4 font-semibold text-[#0E5D37] transition-colors hover:bg-[#5FB878]/10"
                            >
                                See the Journey
                            </motion.a>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeUp} className="flex justify-center">
                        <LotusIllustration />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── ABOUT ASHU ── */}
            <section id="about-ashu" className="px-6 py-20 md:px-16 md:py-28">
                <motion.div
                    className="mx-auto max-w-3xl"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="group relative">
                        <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-r from-[#5FB878] to-[#0E5D37] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40" />

                        <div className="relative rounded-3xl border border-[#0E5D37]/10 bg-white/70 p-8 shadow-[0_8px_40px_rgba(14,93,55,0.08)] backdrop-blur-xl md:p-12">
                            <Quote className="h-8 w-8 text-[#5FB878]" strokeWidth={1.5} />

                            <div className="mt-6 flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5FB878] to-[#0E5D37] text-2xl font-bold text-white shadow-md">
                                    A
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#0E5D37]">
                                        Hi, I&apos;m Ashu.
                                    </h3>
                                    <p className="mt-4 leading-relaxed text-gray-600">
                                        I am passionate about helping people develop focus,
                                        inner awareness, and a consistent meditation practice.
                                        Through this structured online course, I guide students
                                        step by step — from the foundations of meditation to
                                        advanced Tai Chi Ball meditation techniques.
                                    </p>
                                    <p className="mt-4 leading-relaxed text-gray-600">
                                        My goal is to help every student build confidence in
                                        their meditation practice through clear guidance,
                                        regular practice, and personal support.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── WHY LEARN HERE ── */}
            <section className="bg-gradient-to-b from-white via-[#5FB878]/5 to-white px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        Why Learn Here?
                    </motion.h2>

                    <motion.div
                        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {FEATURES.map(({ icon: Icon, title, desc }) => (
                            <motion.div
                                key={title}
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                                className="group rounded-2xl border border-[#0E5D37]/10 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0E5D37]/10"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5FB878]/15 transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="h-6 w-6 text-[#0E5D37]" strokeWidth={1.7} />
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-[#0E5D37]">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── JOURNEY TIMELINE ── */}
            <section id="journey" className="px-6 py-20 md:px-16 md:py-28">
                <div className="mx-auto max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-bold text-[#0E5D37] md:text-4xl"
                    >
                        Your Journey
                    </motion.h2>

                    <motion.div
                        className="relative mt-16 pl-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0E5D37]/15" />

                        {JOURNEY.map((step) => (
                            <motion.div
                                key={step.week}
                                variants={fadeUp}
                                className="relative mb-10 last:mb-0"
                            >
                                <span className="absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#5FB878] shadow" />
                                <h3 className="text-lg font-bold text-[#0E5D37]">
                                    {step.week}
                                </h3>
                                <p className="mt-1 text-gray-600">{step.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative overflow-hidden px-6 py-24 md:px-16 md:py-32">
                <BackgroundBlobs />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative mx-auto max-w-2xl text-center"
                >
                    <h2 className="text-3xl font-bold text-[#0E5D37] md:text-5xl">
                        Start Your Meditation Journey Today
                    </h2>
                    <p className="mt-5 text-lg text-gray-600">
                        Four weeks. One guide. A calmer, more focused version of
                        yourself.
                    </p>

                    <motion.a
                        href="#"
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-10 py-5 text-lg font-medium text-white shadow-xl shadow-[#0E5D37]/25 transition-colors hover:bg-[#0a4429]"
                    >
                        Book Your First Class
                        <ArrowRight className="h-5 w-5" />
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}