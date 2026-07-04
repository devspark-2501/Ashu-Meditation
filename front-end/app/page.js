'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import ScreenOne from './Components/layout/ScreenOne';
import Footer from './Components/SectionOne/Footer';

const TIMEZONES = ['EST', 'CST', 'MST', 'PST'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 },
  },
};

const upVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function useParallax(strength = 18) {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 15, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 60, damping: 15, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMove = (e) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      rawX.set(relX * strength);
      rawY.set(relY * strength);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [prefersReducedMotion, rawX, rawY, strength]);

  return { x, y };
}

/* ---------------------------------------------
   Interactive grid background (same cursor-glow
   grid used in ScreenOne, retuned for the hero)
--------------------------------------------- */
function GridBackground() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const root = canvas.parentElement;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    window.addEventListener('resize', resize);
    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      drawGrid(-9999, -9999);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div className="home-cursor-follower" ref={cursorRef} />
      <canvas className="home-grid-canvas" ref={canvasRef} />

      <style>{`
        .home-grid-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          width: 100%;
          height: 100%;
        }
        .home-cursor-follower {
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
      `}</style>
    </>
  );
}

function LotusVisual() {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useParallax(16);

  return (
    <motion.div
      className="relative flex w-full max-w-xl justify-center"
      style={prefersReducedMotion ? undefined : { x, y }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.5)_0%,rgba(187,247,208,0.15)_55%,transparent_75%)] blur-2xl" />
      </div>

      <motion.div
        className="relative w-full"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -16, 0], rotate: [0, 2, 0, -2, 0] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      >
        {/* <Image
          src="/lotus.png"
          alt="Lotus"
          width={600}
          height={600}
          className="h-auto w-full object-contain drop-shadow-2xl [will-change:transform]"
          loading="lazy"
          priority={false}
        /> */}
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 md:px-16">
        <GridBackground />

        <motion.div
          className="relative z-10 grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Side */}
          <div>
            <motion.span
              variants={upVariants}
              className="inline-flex items-center gap-2 rounded-full border border-green-200/60 bg-white/70 px-4 py-2 text-sm font-medium text-green-700 shadow-sm backdrop-blur-md mt-10"
            >
              🌿 Live Time Zones
            </motion.span>

            <motion.h1
              variants={upVariants}
              className="mt-7 text-5xl font-bold leading-[1.1] tracking-tight text-green-950 md:text-6xl"
            >
              Find Peace.
              <br />
              Reduce Stress.
              <br />
              Transform Your Life.
            </motion.h1>

            <motion.p
              variants={upVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              Live online meditation classes across all U.S. time zones.
              Designed to help you relax, improve focus, and sleep better.
            </motion.p>

            <motion.div variants={upVariants} className="mt-9 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="rounded-full bg-green-800 px-8 py-4 font-medium text-white shadow-lg shadow-green-900/20 transition-colors duration-300 hover:bg-green-900"
              >
                Claim Your Free First Class →
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="rounded-full px-6 py-4 font-semibold text-green-900 transition-colors duration-300 hover:bg-green-100/60"
              >
                View Classes →
              </motion.button>
            </motion.div>

            <motion.div
              variants={upVariants}
              className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl border border-green-100 bg-white/60 px-5 py-4 text-gray-700 shadow-sm backdrop-blur-md"
            >
              <span className="font-medium">Trusted by mindfulness seekers across:</span>
              <div className="flex items-center gap-3 text-green-800">
                {TIMEZONES.map((tz, i) => (
                  <span key={tz} className="flex items-center gap-3">
                    <span className="font-semibold">{tz}</span>
                    {i < TIMEZONES.length - 1 && (
                      <span className="text-green-300">|</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <motion.div variants={upVariants} className="flex justify-center">
            <LotusVisual />
          </motion.div>
        </motion.div>
      </main>

      {/* Sections below the hero get the same fade + slide-up treatment,
          triggered as they scroll into view rather than on page load. */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <ScreenOne />

        <Footer />
      </motion.div>
    </div>
  );
}