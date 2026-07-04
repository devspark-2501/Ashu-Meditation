export default function Footer() {
    const stats = [
        { value: "10k+", label: "Sessions Completed" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "4", label: "U.S. Time Zones" },
        { value: "100+", label: "Guided Meditations" },
    ];

    const footerColumns = [
        {
            title: "Company",
            links: ["About Us", "Our Work", "Blog", "Careers"],
        },
        {
            title: "Services",
            links: [
                "Web Development",
                "Product Design",
                "Mobile Development",
                "Cloud & DevOps",
            ],
        },
        {
            title: "Resources",
            links: ["Case Studies", "FAQ", "Blog", "Contact"],
        },
    ];

    return (
        <div>
            {/* ── TESTIMONIAL + STATS ── */}
            <section className="bg-green-50 px-6 py-14 md:px-16">
                <div className="mx-auto max-w-7xl">
                    <span className="text-xs font-bold uppercase tracking-wide text-green-800">
                        ‖ What Meditators Say
                    </span>

                    <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                        {/* Testimonial card */}
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <p className="text-lg leading-relaxed text-gray-800">
                                &ldquo;ashumeditation completely changed my daily routine.
                                Amazing community, smooth experience, and genuine
                                peace.&rdquo;
                            </p>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white">
                                        SM
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Sarah M.
                                        </p>
                                        <p className="text-sm text-gray-500">New York</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-3xl font-extrabold text-green-900 md:text-4xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-sm leading-snug text-gray-600">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="bg-[#14171a] px-6 py-8 md:px-16">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">
                        Ready to reduce stress and find inner peace?
                    </h3>
                    <a
                        href="#"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500"
                    >
                        Get Started Free →
                    </a>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-[#14171a] px-6 pb-8 pt-14 md:px-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <p className="text-lg font-bold text-white">ashumeditation</p>
                            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
                                Design-driven development studio crafting digital
                                experiences that matter or impact.
                            </p>

                            <div className="mt-6 flex items-center gap-3">
                                {["Twitter", "LinkedIn", "YouTube", "Dribbble"].map(
                                    (label) => (
                                        <a
                                            key={label}
                                            href="#"
                                            aria-label={label}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
                                        >
                                            <SocialIcon name={label} />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Link columns */}
                        {footerColumns.map((col) => (
                            <div key={col.title}>
                                <p className="text-sm font-semibold text-white">
                                    {col.title}
                                </p>
                                <ul className="mt-4 space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-gray-400 transition-colors hover:text-white"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Connect */}
                        <div>
                            <p className="text-sm font-semibold text-white">
                                Let&apos;s Connect
                            </p>
                            <ul className="mt-4 space-y-3">
                                <li className="flex items-center gap-2 text-sm text-gray-400">
                                    <SocialIcon name="Mail" />
                                    hello@ashumeditation.com
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-400">
                                    <SocialIcon name="Phone" />
                                    WhatsApp
                                </li>
                            </ul>

                            <div className="mt-6 flex items-center gap-3">
                                {["Facebook", "Twitter", "Instagram", "Dribbble"].map(
                                    (label) => (
                                        <a
                                            key={label}
                                            href="#"
                                            aria-label={label}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
                                        >
                                            <SocialIcon name={label} />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center">
                        <p>© 2028 ashumeditation. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="transition-colors hover:text-white">
                                Privacy Policy
                            </a>
                            <a href="#" className="transition-colors hover:text-white">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ---------------------------------------------
   Minimal inline social/contact icons
   (kept local so this file has no extra deps)
--------------------------------------------- */
function SocialIcon({ name }) {
    const common = {
        width: 16,
        height: 16,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    switch (name) {
        case "Twitter":
            return (
                <svg {...common}>
                    <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 001.8-2.2 8 8 0 01-2.5 1 4 4 0 00-6.9 3.6A11.4 11.4 0 013 4.9a4 4 0 001.2 5.3 4 4 0 01-1.8-.5v.1a4 4 0 003.2 3.9 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 18.4a11.3 11.3 0 006.1 1.8c7.3 0 11.3-6 11.3-11.3v-.5A8 8 0 0022 5.9z" />
                </svg>
            );
        case "LinkedIn":
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M7 10v7M7 7v.01M11 17v-4.5a2 2 0 014 0V17M11 12.5V17" />
                </svg>
            );
        case "YouTube":
            return (
                <svg {...common}>
                    <rect x="2.5" y="6" width="19" height="12" rx="3" />
                    <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
                </svg>
            );
        case "Dribbble":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M4 9.5c4 1.4 9 1.4 15.5-.3M3.2 14c5-.6 10.4.3 14 4.3M9 3.3c3 4.2 4.6 9.4 4.4 14.7" />
                </svg>
            );
        case "Facebook":
            return (
                <svg {...common}>
                    <path d="M15 8h-2a2 2 0 00-2 2v10M9 13h6" />
                    <path d="M15 3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3z" />
                </svg>
            );
        case "Instagram":
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M17.5 6.5h.01" />
                </svg>
            );
        case "Mail":
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                </svg>
            );
        case "Phone":
            return (
                <svg {...common}>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </svg>
            );
        default:
            return null;
    }
}