import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function AnalyticsChart() {

    const data = [
        { day: "05/05", clicks: 0 },
        { day: "05/10", clicks: 0 },
        { day: "05/15", clicks: 0 },
        { day: "05/20", clicks: 0 },
        { day: "05/25", clicks: 0 },
        { day: "06/01", clicks: 0 }
    ];

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-8">

            <h2 className="text-3xl font-semibold mb-6">
                Click Trends — Last 30 Days
            </h2>

            <div className="h-[300px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="clicks"
                            stroke="#4F46E5"
                            strokeWidth={3}
                        />

                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default AnalyticsChart;