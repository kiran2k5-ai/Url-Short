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
        <section className="py-16 border-y overflow-hidden bg-white">

            <motion.div
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear"
                }}
                className="flex gap-8 w-max"
            >

                {[...stats, ...stats].map((item, index) => (

                    <motion.div
                        key={index}
                        whileHover={{
                            scale: 1.08,
                            y: -5
                        }}
                        className="min-w-[280px] bg-white border border-gray-100 shadow-lg rounded-3xl p-8 text-center"
                    >

                        <h2 className="text-5xl font-bold text-indigo-600">
                            {item[0]}
                        </h2>

                        <p className="mt-3 text-gray-500">
                            {item[1]}
                        </p>

                    </motion.div>

                ))}

            </motion.div>

        </section>
    );
}

export default Stats;