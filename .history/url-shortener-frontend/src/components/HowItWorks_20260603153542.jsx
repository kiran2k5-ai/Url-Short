import {
    Link2,
    Sparkles,
    BarChart3
} from "lucide-react";

import { motion } from "framer-motion";

function HowItWorks() {

    const steps = [
        {
            icon: <Link2 size={32} />,
            title: "Paste your URL",
            description:
                "Enter any long URL you want to shorten and manage."
        },
        {
            icon: <Sparkles size={32} />,
            title: "Generate Link",
            description:
                "Create a branded short URL with QR code instantly."
        },
        {
            icon: <BarChart3 size={32} />,
            title: "Track Analytics",
            description:
                "Monitor clicks, devices, browsers and countries."
        }
    ];

    return (
        <section
            id="how"
            className="py-28 bg-white"
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
                    How It Works
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
                    className="text-center text-gray-500 mt-5 text-lg"
                >
                    Create, share and analyze your links
                    in just a few seconds.
                </motion.p>

                <div className="relative mt-20">

                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200"></div>

                    <div className="grid md:grid-cols-3 gap-10">

                        {steps.map((step, index) => (

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
                                    scale: 1.03,
                                    rotateX: 5,
                                    rotateY: 5
                                }}
                                className="relative bg-white border border-gray-100 shadow-lg rounded-3xl p-8 text-center"
                            >

                                <motion.div
                                    whileHover={{
                                        rotate: 10,
                                        scale: 1.15
                                    }}
                                    className="w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto"
                                >
                                    {step.icon}
                                </motion.div>

                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                                    {index + 1}
                                </div>

                                <h3 className="mt-8 text-2xl font-semibold">
                                    {step.title}
                                </h3>

                                <p className="mt-4 text-gray-500 leading-relaxed">
                                    {step.description}
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
                                    className="h-1 bg-indigo-600 rounded-full mt-6"
                                />

                            </motion.div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;