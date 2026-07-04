"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------
   Small inline icon set (no external images)
--------------------------------------------- */
function IconTile({ children }) {
    return (
        <div className="icon-tile">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {children}
            </svg>
        </div>
    );
}

const Icons = {
    breath: (
        <IconTile>
            <path d="M12 3c-1.5 3-4 4-4 7a4 4 0 008 0c0-3-2.5-4-4-7z" stroke="#166534" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M6 20c1.2-1.6 3.6-2.5 6-2.5s4.8.9 6 2.5" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
        </IconTile>
    ),
    brain: (
        <IconTile>
            <path d="M9 4a3 3 0 00-3 3v.2A3 3 0 004 10a3 3 0 002 2.8V14a3 3 0 003 3h1V4H9z" stroke="#166534" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M15 4a3 3 0 013 3v.2A3 3 0 0120 10a3 3 0 01-2 2.8V14a3 3 0 01-3 3h-1V4h1z" stroke="#166534" strokeWidth="1.4" strokeLinejoin="round" />
        </IconTile>
    ),
    moon: (
        <IconTile>
            <path d="M20 14.5A8 8 0 119.5 4a6.5 6.5 0 1010.5 10.5z" stroke="#166534" strokeWidth="1.5" strokeLinejoin="round" />
        </IconTile>
    ),
    live: (
        <IconTile>
            <circle cx="12" cy="12" r="2" stroke="#166534" strokeWidth="1.5" />
            <path d="M7.5 9a6 6 0 000 6M16.5 9a6 6 0 010 6M5 6a10 10 0 000 12M19 6a10 10 0 010 12" stroke="#166534" strokeWidth="1.3" strokeLinecap="round" />
        </IconTile>
    ),
    sunrise: (
        <IconTile>
            <path d="M5 15h14M12 6v4M8 8.5l1.8 1.8M16 8.5l-1.8 1.8" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 15a4 4 0 018 0" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 18h18" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
        </IconTile>
    ),
    sunset: (
        <IconTile>
            <path d="M8 12a4 4 0 018 0" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 4v3M6 9l1.8 1.8M18 9l-1.8 1.8" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 15h18M4.5 18h15" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
        </IconTile>
    ),
    compass: (
        <IconTile>
            <circle cx="12" cy="12" r="8" stroke="#166534" strokeWidth="1.5" />
            <path d="M14.5 9.5l-2 5-3-2 2-5 3 2z" stroke="#166534" strokeWidth="1.2" strokeLinejoin="round" />
        </IconTile>
    ),
    calendar: (
        <IconTile>
            <rect x="4.5" y="5.5" width="15" height="14" rx="2" stroke="#166534" strokeWidth="1.5" />
            <path d="M4.5 9.5h15M8 3.5v3M16 3.5v3" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
        </IconTile>
    ),
    video: (
        <IconTile>
            <rect x="3.5" y="6.5" width="12" height="11" rx="2" stroke="#166534" strokeWidth="1.5" />
            <path d="M15.5 10.5l5-2.5v8l-5-2.5" stroke="#166534" strokeWidth="1.5" strokeLinejoin="round" />
        </IconTile>
    ),
    sparkle: (
        <IconTile>
            <path d="M12 4l1.6 4.6L18 10l-4.4 1.4L12 16l-1.6-4.6L6 10l4.4-1.4L12 4z" stroke="#166534" strokeWidth="1.3" strokeLinejoin="round" />
        </IconTile>
    ),
};

/* ---------------------------------------------
   Data
--------------------------------------------- */
const PROGRAM_CARDS = [
    { icon: Icons.breath, title: "Beginner Meditation.", desc: "Easy breathing & foundations." },
    { icon: Icons.brain, title: "Stress Relief.", desc: "Guided live sessions to calm the mind." },
    { icon: Icons.moon, title: "Sleep Meditation.", desc: "Evening routines for restorative sleep." },
    { icon: Icons.live, title: "Live Course.", desc: "Live weekly classes & daily practice." },
];

const METHOD_STEPS = [
    { icon: Icons.compass, label: "01. Choose Class", desc: "Select style and U.S. time zone." },
    { icon: Icons.calendar, label: "02. Book Online", desc: "Secure your spot instantly." },
    { icon: Icons.video, label: "03. Join Session", desc: "Get direct meeting link via email." },
    { icon: Icons.sparkle, label: "04. Find Peace", desc: "Log in from home and unwind." },
];

/* ---------------------------------------------
   Small reusable UI mock: mindfulness timer card
--------------------------------------------- */
function TrackerMock() {
    return (
        <div className="tracker-mock">
            <span className="tracker-mock-label">Mindfulness Tracker</span>
            <div className="tracker-ring">
                <svg viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" stroke="#d7f0df" strokeWidth="6" fill="none" />
                    <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="#16a34a"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="213.6"
                        strokeDashoffset="60"
                        transform="rotate(-90 40 40)"
                    />
                </svg>
                <span className="tracker-time">10:00</span>
            </div>
        </div>
    );
}

/* ---------------------------------------------
   Main component
--------------------------------------------- */
export default function ScreenOne() {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const smoothMouse = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const root = canvas.parentElement;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let W, H;
        const CELL = 56;
        const GLOW_R = 220;

        const resize = () => {
            W = root.offsetWidth;
            H = root.offsetHeight;
            canvas.width = W;
            canvas.height = H;
        };

        const lerp = (a, b, t) => a + (b - a) * t;

        const drawGrid = (mx, my) => {
            ctx.clearRect(0, 0, W, H);

            const cols = Math.ceil(W / CELL) + 1;
            const rows = Math.ceil(H / CELL) + 1;

            for (let c = 0; c <= cols; c++) {
                const x = c * CELL;
                let maxT = 0;
                for (let r = 0; r <= rows; r++) {
                    const dist = Math.hypot(x - mx, r * CELL - my);
                    maxT = Math.max(maxT, Math.max(0, 1 - dist / GLOW_R));
                }
                ctx.strokeStyle = `rgba(22,101,52,${0.05 + maxT * 0.32})`;
                ctx.lineWidth = 0.5 + maxT * 0.8;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }

            for (let r = 0; r <= rows; r++) {
                const y = r * CELL;
                let maxT = 0;
                for (let c = 0; c <= cols; c++) {
                    const dist = Math.hypot(c * CELL - mx, y - my);
                    maxT = Math.max(maxT, Math.max(0, 1 - dist / GLOW_R));
                }
                ctx.strokeStyle = `rgba(22,101,52,${0.05 + maxT * 0.32})`;
                ctx.lineWidth = 0.5 + maxT * 0.8;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }

            for (let c = 0; c <= cols; c++) {
                for (let r = 0; r <= rows; r++) {
                    const x = c * CELL;
                    const y = r * CELL;
                    const dist = Math.hypot(x - mx, y - my);
                    const t = Math.max(0, 1 - dist / (GLOW_R * 0.65));
                    if (t > 0.04) {
                        ctx.beginPath();
                        ctx.arc(x, y, 1.1 + t * 2.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(34,197,94,${t * 0.65})`;
                        ctx.fill();
                    }
                }
            }
        };

        const onMove = (e) => {
            const rect = root.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => {
            mouse.current = { x: -9999, y: -9999 };
        };

        const loop = () => {
            smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.07);
            smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.07);

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${smoothMouse.current.x}px, ${smoothMouse.current.y}px)`;
            }

            drawGrid(smoothMouse.current.x, smoothMouse.current.y);
            rafRef.current = requestAnimationFrame(loop);
        };

        resize();
        window.addEventListener("resize", resize);
        root.addEventListener("mousemove", onMove);
        root.addEventListener("mouseleave", onLeave);

        if (!prefersReduced) {
            rafRef.current = requestAnimationFrame(loop);
        } else {
            drawGrid(-9999, -9999);
        }

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            root.removeEventListener("mousemove", onMove);
            root.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div>
            <div className="mf-cursor-follower" ref={cursorRef} />

            <div className="mf-root">
                <canvas className="mf-grid-canvas" ref={canvasRef} />
                <div className="mf-orb mf-orb-1" />
                <div className="mf-orb mf-orb-2" />
                <div className="mf-orb mf-orb-3" />

                {/* ── PROGRAMS ── */}
                <section className="mf-section">
                    <div className="mf-row">
                        <div className="mf-copy">
                            <span className="mf-eyebrow">‖ OUR PROGRAMS</span>
                            <h2 className="mf-heading">
                                From stress to
                                <br />
                                inner stillness.
                            </h2>
                            <p className="mf-subtext">
                                We partner with you to build lasting routines for genuine
                                mindfulness.
                            </p>
                            <a href="#" className="mf-link">
                                View all programs →
                            </a>
                        </div>

                        <div className="mf-grid mf-grid-4">
                            {PROGRAM_CARDS.map((card) => (
                                <div className="mf-card" key={card.title}>
                                    {card.icon}
                                    <h3 className="mf-card-title">{card.title}</h3>
                                    <p className="mf-card-desc">{card.desc}</p>
                                    <a href="#" className="mf-card-link">
                                        Learn more →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── LIVE SESSIONS ── */}
                <section className="mf-section">
                    <div className="mf-row">
                        <div className="mf-copy">
                            <span className="mf-eyebrow">‖ LIVE SESSIONS</span>
                            <h2 className="mf-heading">
                                Virtual studios
                                <br />
                                we&apos;re proud of
                            </h2>
                            <p className="mf-subtext">
                                Guided sessions with expert instructors to help you find
                                balance.
                            </p>
                            <a href="#" className="mf-link">
                                View all schedules →
                            </a>
                        </div>

                        <div className="mf-grid mf-grid-3">
                            <div className="mf-media-card">
                                <div className="mf-media-visual mf-media-sunrise">
                                    {Icons.sunrise}
                                </div>
                                <h3 className="mf-card-title">Morning Clarity Session</h3>
                                <p className="mf-card-desc">Live</p>
                                <a href="#" className="mf-card-link">
                                    View schedule →
                                </a>
                            </div>

                            <div className="mf-media-card">
                                <div className="mf-media-visual mf-media-sunset">
                                    {Icons.sunset}
                                </div>
                                <h3 className="mf-card-title">Sunset Decompression</h3>
                                <p className="mf-card-desc">Guided</p>
                                <a href="#" className="mf-card-link">
                                    View schedule →
                                </a>
                            </div>

                            <div className="mf-media-card mf-media-card-mock">
                                <TrackerMock />
                                <h3 className="mf-card-title">Mindfulness Tracker</h3>
                                <p className="mf-card-desc">Daily Practice</p>
                                <a href="#" className="mf-card-link">
                                    View feature →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── METHOD ── */}
                <section className="mf-section">
                    <div className="mf-row">
                        <div className="mf-copy">
                            <span className="mf-eyebrow">‖ OUR METHOD</span>
                            <h2 className="mf-heading">
                                Simple steps.
                                <br />
                                Lasting calm.
                            </h2>
                            <p className="mf-subtext">
                                A direct path from registration to relaxation.
                            </p>
                            <a href="#" className="mf-link">
                                Learn more about us →
                            </a>
                        </div>

                        <div className="mf-steps">
                            {METHOD_STEPS.map((step, i) => (
                                <div className="mf-step" key={step.label}>
                                    {step.icon}
                                    <p className="mf-step-label">{step.label}</p>
                                    <p className="mf-step-desc">{step.desc}</p>
                                    {i < METHOD_STEPS.length - 1 && (
                                        <span className="mf-step-connector" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .mf-root {
                    position: relative;
                    background: #f6faf7;
                    overflow: hidden;
                    cursor: none;
                }

                .mf-grid-canvas {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                    width: 100%;
                    height: 100%;
                }

                .mf-orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    filter: blur(90px);
                }
                .mf-orb-1 {
                    width: 560px;
                    height: 560px;
                    background: radial-gradient(circle, rgba(34,197,94,0.16), transparent 65%);
                    top: -160px;
                    right: -140px;
                    animation: mfDrift1 10s ease-in-out infinite alternate;
                }
                .mf-orb-2 {
                    width: 460px;
                    height: 460px;
                    background: radial-gradient(circle, rgba(134,239,172,0.18), transparent 65%);
                    bottom: 10%;
                    left: -100px;
                    animation: mfDrift2 12s ease-in-out infinite alternate;
                }
                .mf-orb-3 {
                    width: 320px;
                    height: 320px;
                    background: radial-gradient(circle, rgba(190,242,210,0.2), transparent 65%);
                    top: 45%;
                    left: 48%;
                    animation: mfDrift3 8s ease-in-out infinite alternate;
                }
                @keyframes mfDrift1 { 0% { transform: translate(0,0) scale(1);} 100% { transform: translate(-50px,60px) scale(1.1);} }
                @keyframes mfDrift2 { 0% { transform: translate(0,0) scale(1);} 100% { transform: translate(60px,-40px) scale(1.08);} }
                @keyframes mfDrift3 { 0% { transform: translate(0,0) scale(1);} 100% { transform: translate(-40px,-50px) scale(1.15);} }

                .mf-cursor-follower {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 340px;
                    height: 340px;
                    margin-left: -170px;
                    margin-top: -170px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    background: radial-gradient(circle, rgba(134,239,172,0.28) 0%, rgba(34,197,94,0.1) 45%, transparent 70%);
                    filter: blur(6px);
                    mix-blend-mode: multiply;
                    will-change: transform;
                }

                .mf-section {
                    position: relative;
                    z-index: 2;
                    padding: 64px 5vw;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .mf-row {
                    max-width: 1280px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 48px;
                    align-items: start;
                }

                .mf-copy {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .mf-eyebrow {
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    color: #16a34a;
                    text-transform: uppercase;
                }

                .mf-heading {
                    font-size: clamp(26px, 2.6vw, 34px);
                    font-weight: 800;
                    line-height: 1.2;
                    color: #0f2417;
                    letter-spacing: -0.5px;
                }

                .mf-subtext {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #5b6b62;
                    max-width: 280px;
                }

                .mf-link {
                    font-size: 14px;
                    font-weight: 600;
                    color: #14532d;
                    text-decoration: none;
                    width: fit-content;
                    border-bottom: 1px solid transparent;
                    transition: border-color 0.2s;
                }
                .mf-link:hover { border-color: #14532d; }

                .mf-grid {
                    display: grid;
                    gap: 20px;
                }
                .mf-grid-4 { grid-template-columns: repeat(4, 1fr); }
                .mf-grid-3 { grid-template-columns: repeat(3, 1fr); }

                .mf-card, .mf-media-card {
                    background: #ffffff;
                    border: 1px solid #e7f3ea;
                    border-radius: 16px;
                    padding: 22px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    box-shadow: 0 1px 10px rgba(20,83,45,0.05);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .mf-card:hover, .mf-media-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 24px rgba(20,83,45,0.1);
                }

                .icon-tile {
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    background: #e8f7ec;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 8px;
                }
                .icon-tile svg { width: 22px; height: 22px; }

                .mf-card-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #0f2417;
                }
                .mf-card-desc {
                    font-size: 13px;
                    color: #6b8073;
                    line-height: 1.5;
                    flex: 1;
                }
                .mf-card-link {
                    font-size: 13px;
                    font-weight: 600;
                    color: #16a34a;
                    text-decoration: none;
                    margin-top: 4px;
                }
                .mf-card-link:hover { text-decoration: underline; }

                .mf-media-visual {
                    height: 120px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                }
                .mf-media-sunrise { background: linear-gradient(160deg, #eafff1, #cdf3db); }
                .mf-media-sunset { background: linear-gradient(160deg, #e6f8ec, #b9ecc9); }
                .mf-media-visual .icon-tile {
                    background: rgba(255,255,255,0.7);
                    width: 56px; height: 56px; margin-bottom: 0;
                }
                .mf-media-visual .icon-tile svg { width: 28px; height: 28px; }

                .mf-media-card-mock { align-items: stretch; }
                .tracker-mock {
                    background: #eafcf1;
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .tracker-mock-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: #16a34a;
                    align-self: flex-start;
                }
                .tracker-ring { position: relative; width: 80px; height: 80px; }
                .tracker-ring svg { width: 80px; height: 80px; }
                .tracker-time {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 700;
                    color: #0f2417;
                }

                .mf-steps {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }
                .mf-step {
                    position: relative;
                    background: #ffffff;
                    border: 1px solid #e7f3ea;
                    border-radius: 16px;
                    padding: 22px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    box-shadow: 0 1px 10px rgba(20,83,45,0.05);
                }
                .mf-step-label { font-size: 14px; font-weight: 700; color: #0f2417; }
                .mf-step-desc { font-size: 13px; color: #6b8073; line-height: 1.5; }
                .mf-step-connector {
                    display: none;
                }
                @media (min-width: 861px) {
                    .mf-step-connector {
                        display: block;
                        position: absolute;
                        top: 42px;
                        right: -24px;
                        width: 24px;
                        border-top: 2px dashed #bfe6cc;
                    }
                }

                @media (max-width: 1024px) {
                    .mf-grid-4 { grid-template-columns: repeat(2, 1fr); }
                    .mf-grid-3 { grid-template-columns: repeat(2, 1fr); }
                    .mf-steps { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 860px) {
                    .mf-row { grid-template-columns: 1fr; }
                    .mf-subtext { max-width: 100%; }
                }

                @media (max-width: 560px) {
                    .mf-section { padding: 44px 20px; }
                    .mf-grid-4, .mf-grid-3, .mf-steps { grid-template-columns: 1fr; }
                    .mf-step-connector { display: none; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .mf-orb-1, .mf-orb-2, .mf-orb-3 { animation: none; }
                }
            `}</style>
        </div>
    );
}