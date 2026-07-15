'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong. Please try again.');
                setIsSubmitting(false);
                return;
            }

            // Registration succeeded — sign them straight in.
            const result = await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            setIsSubmitting(false);

            if (result?.error) {
                // Account was created but auto sign-in failed — send to login instead.
                router.push('/login');
                return;
            }

            router.push(callbackUrl);
            router.refresh();
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    const handleGoogle = async () => {
        setIsGoogleLoading(true);
        await signIn('google', { callbackUrl });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#5FB878]/10 via-white to-white px-6 pt-30">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#5FB878]/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-[#0E5D37]/10 blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md rounded-3xl border border-[#0E5D37]/10 bg-white/80 p-8 shadow-[0_8px_40px_rgba(14,93,55,0.08)] backdrop-blur-xl md:p-10"
            >
                <h1 className="text-center text-3xl font-bold text-[#0E5D37]">
                    Create Your Account
                </h1>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Start your meditation journey today.
                </p>

                {error && (
                    <div className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#1E1E1E]/80">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                className="w-full rounded-xl border border-[#0E5D37]/15 bg-white px-11 py-3 text-sm text-[#1E1E1E] placeholder:text-gray-400 transition-colors focus:border-[#0E5D37] focus:outline-none focus:ring-2 focus:ring-[#0E5D37]/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#1E1E1E]/80">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-[#0E5D37]/15 bg-white px-11 py-3 text-sm text-[#1E1E1E] placeholder:text-gray-400 transition-colors focus:border-[#0E5D37] focus:outline-none focus:ring-2 focus:ring-[#0E5D37]/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#1E1E1E]/80">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={8}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="At least 8 characters"
                                className="w-full rounded-xl border border-[#0E5D37]/15 bg-white px-11 py-3 text-sm text-[#1E1E1E] placeholder:text-gray-400 transition-colors focus:border-[#0E5D37] focus:outline-none focus:ring-2 focus:ring-[#0E5D37]/20"
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0E5D37] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#0E5D37]/20 transition-colors hover:bg-[#0a4429] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            'Create Account'
                        )}
                    </motion.button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#0E5D37]/10" />
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        or
                    </span>
                    <div className="h-px flex-1 bg-[#0E5D37]/10" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={isGoogleLoading}
                    className="flex w-full items-center justify-center gap-3 rounded-full border border-[#0E5D37]/15 bg-white px-6 py-3 text-sm font-medium text-[#1E1E1E] shadow-sm transition-colors hover:bg-[#0E5D37]/5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isGoogleLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5a5.6 5.6 0 01-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
                            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.3 7.3 0 01-11-3.8H1v3.1A12 12 0 0012 24z" />
                            <path fill="#FBBC05" d="M5 14.3a7.2 7.2 0 010-4.6V6.6H1a12 12 0 000 10.8l4-3.1z" />
                            <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A11.6 11.6 0 0012 0 12 12 0 001 6.6l4 3.1A7.1 7.1 0 0112 4.8z" />
                        </svg>
                    )}
                    Continue with Google
                </button>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-[#0E5D37] hover:underline">
                        Sign in
                    </a>
                </p>
            </motion.div>
        </div>
    );
}