import { motion } from "framer-motion";

function StatCard({
    title,
    value,
    subtitle,
    icon
}) {
    return (
        <motion.div
            whileHover={{
                y: -5,
                scale: 1.02
            }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
            <div className="flex justify-between items-start">

                <div>
                    <p className="text-xs font-semibold text-gray-500 tracking-wider">
                        {title}
                    </p>

                    <h2 className="text-5xl font-bold mt-3">
                        {value}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        {subtitle}
                    </p>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    {icon}
                </div>

            </div>
        </motion.div>
    );
}

export default StatCard;