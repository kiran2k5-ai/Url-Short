import {
    Link2,
    QrCode,
    BarChart3
} from "lucide-react";

import { motion } from "framer-motion";

function Features() {

    const features = [
        {
            icon: <Link2 size={32} />,
            title: "Custom Short Links",
            description:
                "Create branded and memorable URLs."
        },
        {
            icon: <QrCode size={32} />,
            title: "QR Code Generation",
            description:
                "Instant QR codes for every short URL."
        },
        {
            icon: <BarChart3 size={32} />,
            title: "Advanced Analytics",
            description:
                "Track clicks, browsers, devices and countries."
        }
    ];

    return (
        <section
            id="features"
            className="py-24 bg-slate-50"
        >
            <div className="max-w-7xl mx-auto px-6">

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
                    Everything you need
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
                    className="text-center text-gray-500 mt-4"
                >
                    Powerful tools to manage your links.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8 mt-16">

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
                                delay: index * 0.2,
                                duration: 0.6
                            }}
                            whileHover={{
                                y: -12,
                                scale: 1.04,
                                rotateX: 5,
                                rotateY: 5
                            }}
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 cursor-pointer"
                        >

                            <motion.div
                                whileHover={{
                                    rotate: 15,
                                    scale: 1.15
                                }}
                                transition={{
                                    duration: 0.3
                                }}
                                className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center"
                            >
                                {feature.icon}
                            </motion.div>

                            <h3 className="mt-6 text-2xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>

                            <motion.div
                                initial={{
                                    width: 0
                                }}
                                whileHover={{
                                    width: "100%"
                                }}
                                transition={{
                                    duration: 0.3
                                }}
                                className="h-1 bg-indigo-600 mt-6 rounded-full"
                            />

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default Features;