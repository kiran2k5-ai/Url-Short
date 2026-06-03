import { Check, Crown } from "lucide-react";
import { motion } from "framer-motion";

function Pricing() {

    const plans = [
        {
            name: "Free",
            price: "₹0",
            popular: false,
            features: [
                "Unlimited Short URLs",
                "QR Code Generation",
                "Basic Analytics",
                "Bulk Upload"
            ]
        },
        {
            name: "Pro",
            price: "₹499",
            popular: true,
            features: [
                "Custom Aliases",
                "Advanced Analytics",
                "Geo Tracking",
                "Priority Support"
            ]
        },
        {
            name: "Team",
            price: "₹999",
            popular: false,
            features: [
                "Everything in Pro",
                "Team Collaboration",
                "API Access",
                "Unlimited Analytics"
            ]
        }
    ];

    return (
        <section
            id="pricing"
            className="py-28 bg-gradient-to-b from-white to-slate-50"
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
                    Simple Pricing
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
                    className="text-center text-gray-500 text-lg mt-4"
                >
                    Start free and scale when you grow.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8 mt-20">

                    {plans.map((plan, index) => (

                        <motion.div
                            key={index}
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
                                delay: index * 0.2,
                                duration: 0.6
                            }}
                            whileHover={{
                                y: -12,
                                scale: 1.03
                            }}
                            className={`relative rounded-3xl p-10 shadow-lg bg-white border ${
                                plan.popular
                                    ? "border-indigo-500"
                                    : "border-gray-200"
                            }`}
                        >

                            {plan.popular && (

                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">

                                    <Crown size={16} />

                                    Most Popular

                                </div>

                            )}

                            <h3 className="text-3xl font-bold">
                                {plan.name}
                            </h3>

                            <p className="mt-6 text-6xl font-bold">
                                {plan.price}
                            </p>

                            <p className="text-gray-500 mt-2">
                                per month
                            </p>

                            <ul className="mt-10 space-y-4">

                                {plan.features.map((feature, i) => (

                                    <li
                                        key={i}
                                        className="flex items-center gap-3"
                                    >

                                        <Check
                                            size={18}
                                            className="text-green-500"
                                        />

                                        {feature}

                                    </li>

                                ))}

                            </ul>

                            <motion.button
                                whileHover={{
                                    scale: 1.05
                                }}
                                whileTap={{
                                    scale: 0.95
                                }}
                                className={`w-full mt-10 py-4 rounded-xl font-semibold transition ${
                                    plan.popular
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >
                                Get Started
                            </motion.button>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Pricing;