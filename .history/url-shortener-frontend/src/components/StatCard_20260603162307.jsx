function StatCard({
    title,
    value,
    subtitle,
    icon
}) {
    return (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">

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