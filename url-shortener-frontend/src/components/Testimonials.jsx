import { motion } from "framer-motion";
import { Star } from "lucide-react";

function Testimonials() {

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Digital Marketing Manager",
            text: "The best URL shortener we've ever used. Analytics helped us improve campaign performance significantly."
        },
        {
            name: "Arjun Kumar",
            role: "Growth Lead",
            text: "The analytics dashboard is incredible. We can track every click and optimize campaigns instantly."
        },
        {
            name: "Neha Reddy",
            role: "Product Manager",
            text: "Perfect for marketing teams. QR codes and bulk uploads save us hours every week."
        }
    ];

    return (
        <section className="py-28 bg-slate-50 relative overflow-hidden">

            <div className="absolute top-10 left-20 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

            <div className="absolute bottom-10 right-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

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
                    Loved by teams
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
                    className="text-center text-gray-500 mt-4 text-lg"
                >
                    Thousands of marketers trust LinkNest.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8 mt-16">

                    {testimonials.map((item, index) => (

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
                                y: -10,
                                scale: 1.03,
                                rotateX: 4,
                                rotateY: 4
                            }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                        >

                            <div className="flex gap-1 text-yellow-500">

                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill="currentColor"
                                    />
                                ))}

                            </div>

                            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                                "{item.text}"
                            </p>

                            <div className="mt-8 flex items-center gap-4">

                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                    {item.name.charAt(0)}
                                </div>

                                <div>

                                    <h4 className="font-semibold text-lg">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {item.role}
                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Testimonials;