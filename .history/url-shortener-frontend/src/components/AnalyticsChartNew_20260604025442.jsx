import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { useData } from "../context/DataContext";

function AnalyticsChart() {
    const { urls } = useData();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Generate mock data based on actual URLs
        const generateChartData = () => {
            const today = new Date();
            const data = [];
            
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                
                // Distribute clicks across URLs
                let totalClicks = 0;
                urls.forEach((url, index) => {
                    const baseClicks = url.clickCount || 0;
                    const variation = Math.floor(Math.random() * Math.max(baseClicks, 10));
                    totalClicks += variation;
                });
                
                data.push({
                    day: `${month}/${day}`,
                    clicks: Math.max(0, totalClicks),
                    visitors: Math.floor(totalClicks * 0.7),
                    activeLinks: urls.filter(url => !url.expiryDate || new Date(url.expiryDate) > today).length
                });
            }
            return data;
        };

        const newData = generateChartData();
        setChartData(newData);
    }, [urls]);

    const totalClicks = urls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    const avgClicksPerLink = urls.length > 0 ? Math.round(totalClicks / urls.length) : 0;

    return (
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900">Analytics Overview</h2>
                <p className="text-gray-500 text-sm mt-2">Last 30 days performance metrics</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                        <p className="text-gray-600 text-sm font-medium">Total Clicks</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{totalClicks.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">Across all links</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                        <p className="text-gray-600 text-sm font-medium">Avg Clicks/Link</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">{avgClicksPerLink}</p>
                        <p className="text-xs text-gray-500 mt-1">Average per URL</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                        <p className="text-gray-600 text-sm font-medium">Active Links</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">{urls.filter(url => !url.expiryDate || new Date(url.expiryDate) > new Date()).length}</p>
                        <p className="text-xs text-gray-500 mt-1">Currently active</p>
                    </div>
                </div>
            </div>

            <div className="h-96">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="clicks"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            dot={{ fill: '#4F46E5', r: 5 }}
                            activeDot={{ r: 7 }}
                            name="Clicks"
                        />
                        <Line
                            type="monotone"
                            dataKey="visitors"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: '#10b981', r: 4 }}
                            name="Visitors"
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AnalyticsChart;
