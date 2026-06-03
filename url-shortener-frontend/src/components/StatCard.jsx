function StatCard({
    title,
    value,
    subtitle,
    icon,
    color = "from-indigo-400 to-indigo-600"
}) {
    const colorMap = {
        "from-blue-400 to-blue-600": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", gradient: "bg-gradient-to-br from-blue-400 to-blue-600" },
        "from-green-400 to-green-600": { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", gradient: "bg-gradient-to-br from-green-400 to-green-600" },
        "from-purple-400 to-purple-600": { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", gradient: "bg-gradient-to-br from-purple-400 to-purple-600" },
        "from-orange-400 to-orange-600": { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", gradient: "bg-gradient-to-br from-orange-400 to-orange-600" },
        "from-pink-400 to-pink-600": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", gradient: "bg-gradient-to-br from-pink-400 to-pink-600" },
    };

    const colorConfig = colorMap[color] || colorMap["from-indigo-400 to-indigo-600"];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform group">

            <div className="flex justify-between items-start">

                <div className="flex-1">

                    <p className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                        {title}
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">
                        {value}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-600 mt-2 font-medium">
                        {subtitle}
                    </p>

                </div>

                <div className={`w-14 h-14 rounded-xl ${colorConfig.gradient} flex items-center justify-center text-white flex-shrink-0 ml-3 shadow-md group-hover:shadow-lg transition-all`}>
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatCard;