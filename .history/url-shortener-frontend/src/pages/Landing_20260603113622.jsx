import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiLock, FiQrcode, FiUpload, FiZap } from "react-icons/fi";

const highlights = [
    { title: "Branded short links", description: "Custom aliases, expiry controls, and QR codes in one polished workflow." },
    { title: "Analytics that matter", description: "Track clicks, devices, browsers, countries, and cities from one dashboard." },
    { title: "Bulk creation at scale", description: "Upload CSV files and generate dozens of tracked URLs in seconds." }
];

const featurePillars = [
    { icon: FiZap, title: "Instant creation", description: "Launch short links with alias and expiry controls in a single modal." },
    { icon: FiBarChart2, title: "Real analytics", description: "See click history, browser split, device split, and geo breakdowns." },
    { icon: FiQrcode, title: "QR ready", description: "Generate QR codes alongside every short link for offline and print use." },
    { icon: FiUpload, title: "CSV upload", description: "Bulk-import URLs while preserving aliases and expiration settings." },
    { icon: FiLock, title: "JWT protected", description: "Login and protect all workspace routes with secure bearer token handling." },
    { icon: FiCheckCircle, title: "Production posture", description: "Responsive layouts, motion, skeletons, toasts, and careful empty states." }
];

function Landing() {
    return (
        <div className="relative overflow-hidden">
            <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                <div className="glass-panel flex items-center justify-between rounded-full border border-white/60 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950/60">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B4BFF] to-[#7C6CFF] text-lg font-semibold text-white shadow-lg shadow-[#5B4BFF]/20">U</div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">URLCompany</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Premium URL Shortener SaaS</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Login</Link>
                        <Link to="/signup" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:scale-[1.01] dark:bg-white dark:text-slate-950">Signup</Link>
                    </div>
                </div>

                <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
                    <div className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-[#5B4BFF]/20 bg-[#5B4BFF]/8 px-4 py-2 text-sm font-medium text-[#5B4BFF] dark:text-[#9D97FF]">
                            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                            Built for high-trust product demos and production teams
                        </motion.div>

                        <div className="space-y-5">
                            <h1 className="display-font max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 text-balance sm:text-6xl lg:text-7xl dark:text-white">
                                Short links, analytics, and QR workflows with a premium SaaS finish.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Create branded links, measure engagement, manage expirations, and upload campaigns in bulk. The frontend is wired to your live backend and designed to feel like a modern product landing page plus internal operations console.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link to="/signup" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(91,75,255,0.25)] transition hover:scale-[1.01]">
                                Get started
                                <FiArrowRight />
                            </Link>
                            <Link to="/login" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                                Open dashboard
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {highlights.map((item) => (
                                <div key={item.title} className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65">
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative">
                        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#5B4BFF]/20 blur-3xl" />
                        <div className="absolute -right-8 bottom-16 h-40 w-40 rounded-full bg-[#7C6CFF]/20 blur-3xl" />

                        <div className="relative rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_32px_120px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
                            <div className="rounded-[28px] bg-[#0F172A] p-5 text-white shadow-inner shadow-black/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live workspace</p>
                                        <h2 className="mt-2 text-2xl font-semibold">Dashboard overview</h2>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">Realtime</div>
                                </div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {[
                                        ["URLs created", "1,284"],
                                        ["Total clicks", "94.8k"],
                                        ["Top browser", "Chrome"],
                                        ["Top country", "United States"]
                                    ].map(([label, value]) => (
                                        <div key={label} className="rounded-3xl bg-white/8 p-4">
                                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
                                            <p className="mt-2 text-2xl font-semibold">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] p-5">
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {[
                                            ["Short URLs", "256"],
                                            ["QR scans", "4.3k"],
                                            ["Bulk imports", "67"]
                                        ].map(([label, value]) => (
                                            <div key={label} className="rounded-2xl bg-white/12 p-4">
                                                <p className="text-xs uppercase tracking-[0.24em] text-white/70">{label}</p>
                                                <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                                <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">QR-ready creator</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Generate a branded link, copy it instantly, and surface the QR code in the same flow.</p>
                                </div>
                                <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Bulk CSV uploads</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Upload operational campaigns without leaving the product experience.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-3">
                    {featurePillars.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.title} className="rounded-[30px] border border-white/60 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B4BFF]/15 to-[#7C6CFF]/15 text-[#5B4BFF] dark:text-[#9D97FF]">
                                    <Icon size={20} />
                                </div>
                                <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 rounded-[36px] border border-white/60 bg-gradient-to-r from-[#0F172A] to-[#111827] p-8 text-white shadow-[0_30px_120px_rgba(15,23,42,0.18)] dark:border-white/10">
                    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Production ready</p>
                            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                Recruiters will see a polished product, not a throwaway demo.
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/signup" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">Create account</Link>
                            <Link to="/login" className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Login</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;