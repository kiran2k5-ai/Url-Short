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
    p-6
    shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)]
    transition-all
    duration-300
    ">

            <div className="flex justify-between">

                <div>

                    <p className="text-xs font-semibold text-gray-500 tracking-wider">
                        {title}
                    </p>

                    <h2 className="text-5xl font-bold mt-4">
                        {value}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {subtitle}
                    </p>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatCard;