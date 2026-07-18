"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Classes", href: "/Classes" },
  { label: "F&Q", href: "/FQ" },
  { label: "Contact", href: "/Contacts" },
];

// Where the CTA sends signed-in users, and where signed-out users end up
// after they sign in (via the callbackUrl on /login).
const CLASSES_PATH = "/Booking";
const LOGIN_PATH = "/login";

const navContainerVariants = {
  hidden: { y: -32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const linkListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const linkItemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.75 },
  },
};

const mobilePanelVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const mobileListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

function NavLink({ href, label }) {
  return (
    <a
      href={href}
      className="group relative px-1 py-2 text-[15px] font-medium text-[#1E1E1E]/80 transition-colors duration-300 hover:text-[#0E5D37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5D37]/40 focus-visible:ring-offset-2 rounded-sm"
    >
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[1.5px]">
        {label}
      </span>
      <span className="pointer-events-none absolute left-1/2 bottom-0 h-[1.5px] w-0 -translate-x-1/2 bg-[#0E5D37] transition-all duration-300 ease-out group-hover:w-[70%]" />
    </a>
  );
}

/**
 * Session-aware CTA. Clicking it never follows a plain href — it always
 * checks auth state first:
 *   - signed in      -> /Classes
 *   - signed out     -> /login?callbackUrl=/Classes
 *   - still checking -> button shows a small spinner and ignores clicks
 */
function CTAButton({ className = "", onNavigate }) {
  const { status } = useSession();
  const router = useRouter();
  const isChecking = status === "loading";

  const handleClick = (e) => {
    e.preventDefault();
    if (isChecking) return;

    onNavigate?.();

    if (status === "authenticated") {
      router.push(CLASSES_PATH);
    } else {
      router.push(`${LOGIN_PATH}?callbackUrl=${encodeURIComponent(CLASSES_PATH)}`);
    }
  };

  return (
    <a
      href={CLASSES_PATH}
      onClick={handleClick}
      aria-busy={isChecking}
      className={`group inline-flex items-center gap-2 rounded-full bg-[#0E5D37] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(14,93,55,0.25)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#157347] hover:shadow-[0_10px_24px_rgba(14,93,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5D37]/50 focus-visible:ring-offset-2 ${
        isChecking ? "cursor-wait opacity-80" : ""
      } ${className}`}
    >
      {isChecking ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          Book Free Session
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </>
      )}
    </a>
  );
}

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navContainerVariants}
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border transition-all duration-300 ${
          isScrolled
            ? "border-[#ECECEC] bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "border-[#ECECEC]/70 bg-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md"
        } px-5 py-3 sm:px-6`}
      >
        {/* Logo */}
        <a
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-[#0E5D37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5D37]/40 rounded-sm sm:text-xl"
        >
          ashumeditation
        </a>

        {/* Desktop links */}
        <motion.ul
          variants={linkListVariants}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <motion.li key={link.href} variants={linkItemVariants}>
              <NavLink {...link} />
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop CTA */}
        <motion.div variants={ctaVariants} className="hidden lg:block">
          <CTAButton />
        </motion.div>

        {/* Mobile / tablet toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#1E1E1E] transition-colors duration-300 hover:bg-[#0E5D37]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5D37]/40 lg:hidden"
        >
          <AnimatePresence initial={false} mode="wait">
            {isMenuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobilePanelVariants}
            className="absolute left-4 right-4 top-[calc(100%+0.5rem)] z-40 rounded-3xl border border-[#ECECEC] bg-white/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              variants={mobileListVariants}
              className="flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={mobileItemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium text-[#1E1E1E]/80 transition-colors duration-200 hover:bg-[#0E5D37]/5 hover:text-[#0E5D37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5D37]/40"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={mobileItemVariants}
                className="mt-2 px-1 pt-2"
              >
                <CTAButton
                  className="w-full justify-center"
                  onNavigate={() => setIsMenuOpen(false)}
                />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}