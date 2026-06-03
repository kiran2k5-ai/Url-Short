function StatCard({
    title,
    value,
    subtitle,
    icon
}) {
    return (
            <div className="
                bg-white
                rounded-3xl
                p-5 md:p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)]
                transition-all
                duration-300
                hover:scale-105
                hover:-translate-y-2
                transform
                ">

            <div className="flex justify-between items-start">

                <div className="flex-1">

                    <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                        {title}
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2 md:mt-4">
                        {value}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                        {subtitle}
                    </p>

                </div>

                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 ml-2">
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatCard;