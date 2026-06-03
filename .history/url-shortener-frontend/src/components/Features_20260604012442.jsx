import {
    Link2,
    QrCode,
    BarChart3,
    Upload,
    Globe,
    Clock,
    Target
} from "lucide-react";

import { motion } from "framer-motion";

function Features() {

    const features = [
        {
            icon: <Link2 size={32} />,
            title: "Smart URL Shortening",
            description: "Create clean, branded short links with custom aliases in seconds."
        },
        {
            icon: <QrCode size={32} />,
            title: "QR Code Generation",
            description: "Instantly generate QR codes for any link. Download in high resolution."
        },
        {
            icon: <BarChart3 size={32} />,
            title: "Detailed Analytics",
            description: "Real-time click tracking with geographic, device, and browser breakdowns."
        },
        {
            icon: <Upload size={32} />,
            title: "Bulk Upload",
            description: "Process hundreds of URLs at once with CSV import and batch management."
        },
        {
            icon: <Globe size={32} />,
            title: "Custom Domains",
            description: "Use your own domain to reinforce brand identity on every link."
        },
        {
            icon: <Clock size={32} />,
            title: "Expiry Management",
            description: "Set expiration dates and automatically deactivate links on schedule."
        },
        {
            icon: <Target size={32} />,
            title: "Advanced Tracking",
            description: "Referrer tracking, UTM parameters, and conversion attribution built in."
        }
    ];

    return (
        <section
            id="features"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-medium text-sm">
                        Features
                    </span>
                </div>

                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.6
                    }}
                    className="text-5xl font-bold text-center"
                >
                    Everything you need to grow
                </motion.h2>

                <motion.p
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6
                    }}
                    className="text-center text-gray-600 mt-4 text-lg"
                >
                    From simple link shortening to enterprise-grade analytics — all in one platform.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-6 mt-16">

                    {features.map((feature, index) => (

                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 50
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{
                                once: true
                            }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.6
                            }}
                            whileHover={{
                                y: -8
                            }}
                            className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#5B4BFF]/30 hover:shadow-lg transition"
                        >

                            <motion.div
                                whileHover={{
                                    rotate: 12,
                                    scale: 1.1
                                }}
                                transition={{
                                    duration: 0.3
                                }}
                                className="w-14 h-14 rounded-2xl bg-purple-100 text-[#5B4BFF] flex items-center justify-center"
                            >
                                {feature.icon}
                            </motion.div>

                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default Features;