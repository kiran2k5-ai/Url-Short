import { motion } from "framer-motion";

function Stats() {

    const stats = [
        ["2.4B+", "Links shortened"],
        ["50K+", "Active users"],
        ["180+", "Countries tracked"],
        ["99.9%", "Uptime SLA"],
        ["500M+", "QR Codes Generated"],
        ["24/7", "Availability"]
    ];

    return (
        <section className="py-16 overflow-hidden bg-white relative">

            {/* Top Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-indigo-500/40 blur-md"></div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-indigo-500/40 blur-md"></div>

            <motion.div
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear"
                }}
                className="flex gap-8 w-max"
            >

                {[...stats, ...stats].map((item, index) => (

                    <motion.div
                        key={index}
                        whileHover={{
                            scale: 1.05,
                            y: -8
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        className="min-w-[300px] bg-white border border-gray-100 shadow-lg hover:shadow-2xl rounded-3xl p-10 text-center cursor-pointer"
                    >

                        <h2 className="text-5xl font-bold text-indigo-600">
                            {item[0]}
                        </h2>

                        <p className="mt-4 text-lg text-gray-500">
                            {item[1]}
                        </p>

                    </motion.div>

                ))}

            </motion.div>

        </section>
    );
}

export default Stats;