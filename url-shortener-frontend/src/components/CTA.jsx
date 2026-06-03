import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTA() {

    return (
        <section className="relative overflow-hidden py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

            <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>

            <div className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-white/10 blur-3xl"></div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 40
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    duration: 0.8
                }}
                className="max-w-5xl mx-auto px-6 text-center relative z-10"
            >

                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6
                    }}
                    className="text-5xl md:text-6xl font-bold"
                >
                    Ready to get started?
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
                        delay: 0.4,
                        duration: 0.6
                    }}
                    className="mt-6 text-xl text-indigo-100"
                >
                    Create your first short URL today and
                    track every click with powerful analytics.
                </motion.p>

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        delay: 0.6,
                        duration: 0.5
                    }}
                    className="mt-10"
                >

                    <motion.div
                        whileHover={{
                            scale: 1.08,
                            y: -4
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                    >
                        <Link
                            to="/signup"
                            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold shadow-xl"
                        >
                            Get Started Free
                        </Link>
                    </motion.div>

                </motion.div>

            </motion.div>

        </section>
    );
}

export default CTA;