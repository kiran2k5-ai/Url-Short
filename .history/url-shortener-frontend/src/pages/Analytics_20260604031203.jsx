import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import AnalyticsChart from "../components/AnalyticsChart";
import { TrendingUp, MousePointerClick, Link2, Activity, MapPin, Smartphone, Globe, Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function Analytics() {
    const { urls, analytics, fetchAnalytics } = useData();
    const [selectedUrlId, setSelectedUrlId] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [deviceData, setDeviceData] = useState(null);
    const [browserData, setBrowserData] = useState(null);

    const selectedUrl = urls.find(u => u._id === selectedUrlId);
    const selectedAnalytics = selectedUrlId ? analytics[selectedUrlId] : null;
    
    const COLORS = ['#6366f1', '#10b981', '#f97316', '#a855f7', '#ec4899'];

    // Calculate geolocation and device breakdown
    useEffect(() => {
        if (selectedAnalytics && selectedAnalytics.recentVisits) {
            const visits = selectedAnalytics.recentVisits;
            
            // City breakdown
            const cityMap = {};
            const countryMap = {};
            const deviceMap = { Mobile: 0, Desktop: 0 };
            const browserMap = {};
            
            visits.forEach(visit => {
                // Cities
                const city = visit.city || "Unknown";
                cityMap[city] = (cityMap[city] || 0) + 1;
                
                // Countries
                const country = visit.country || "Unknown";
                countryMap[country] = (countryMap[country] || 0) + 1;
                
                // Devices
                const device = visit.device || "Desktop";
                deviceMap[device] = (deviceMap[device] || 0) + 1;
                
                // Browsers
                const browser = visit.browser || "Unknown";
                browserMap[browser] = (browserMap[browser] || 0) + 1;
            });
            
            // Convert to arrays and sort
            const deviceArray = Object.entries(deviceMap)
                .map(([device, count]) => ({
                    name: device,
                    value: count
                }));
            
            const browserArray = Object.entries(browserMap)
                .map(([browser, count]) => ({
                    name: browser,
                    value: count
                }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 5);
            
            setGeoData(Object.entries(cityMap)
                .map(([city, count]) => ({
                    city,
                    count
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10));
            setDeviceData(deviceArray);
            setBrowserData(browserArray);
        }
    }, [selectedAnalytics]);


    useEffect(() => {
        if (urls.length > 0 && !selectedUrlId) {
            setSelectedUrlId(urls[0]._id);
            fetchAnalytics(urls[0]._id);
        }
    }, [urls, selectedUrlId, fetchAnalytics]);

    useEffect(() => {
        if (selectedUrlId && !analytics[selectedUrlId]) {
            fetchAnalytics(selectedUrlId);
        }
    }, [selectedUrlId, analytics, fetchAnalytics]);

    const totalClicks = urls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    const avgClicks = urls.length > 0 ? Math.round(totalClicks / urls.length) : 0;

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">Analytics</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                        Monitor traffic and performance of your links
                    </p>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs md:text-sm">Total Clicks</p>
                                <p className="text-2xl md:text-3xl font-bold mt-2">{totalClicks}</p>
                            </div>
                            <MousePointerClick className="text-indigo-600" size={28} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs md:text-sm">Active Links</p>
                                <p className="text-2xl md:text-3xl font-bold mt-2">{urls.length}</p>
                            </div>
                            <Link2 className="text-green-600" size={28} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs md:text-sm">Avg Clicks/Link</p>
                                <p className="text-2xl md:text-3xl font-bold mt-2">{avgClicks}</p>
                            </div>
                            <Activity className="text-purple-600" size={28} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs md:text-sm">Top Performer</p>
                                <p className="text-2xl md:text-3xl font-bold mt-2">
                                    {urls.length > 0 ? Math.max(...urls.map(u => u.clickCount || 0)) : 0}
                                </p>
                            </div>
                            <TrendingUp className="text-orange-600" size={28} />
                        </div>
                    </div>
                </div>

                {/* Analytics Chart */}
                <div className="mt-6 md:mt-8">
                    <AnalyticsChart />
                </div>

                {/* Link-specific Analytics */}
                {urls.length > 0 && (
                    <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* URL Selector */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                                <h3 className="font-semibold text-sm md:text-base mb-4">Select URL</h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {urls.map(url => (
                                        <button
                                            key={url._id}
                                            onClick={() => setSelectedUrlId(url._id)}
                                            className={`w-full text-left p-2 md:p-3 rounded-lg transition hover:scale-105 transform ${
                                                selectedUrlId === url._id
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                            }`}
                                        >
                                            <p className="font-mono text-xs md:text-sm">{url.shortCode}</p>
                                            <p className="text-xs opacity-75 truncate">{url.originalUrl}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* URL Analytics Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                                {selectedUrl && (
                                    <>
                                        <h3 className="font-semibold text-base md:text-lg mb-4">{selectedUrl.shortCode}</h3>

                                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                                            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                                                <p className="text-gray-600 text-xs md:text-sm">Total Clicks</p>
                                                <p className="text-xl md:text-2xl font-bold mt-2">{selectedUrl.clickCount || 0}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                                                <p className="text-gray-600 text-xs md:text-sm">Created</p>
                                                <p className="text-xs md:text-sm font-medium mt-2">
                                                    {new Date(selectedUrl.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {selectedAnalytics && (
                                            <>
                                                <h4 className="font-semibold text-sm md:text-base mb-3">Recent Visits</h4>
                                                {selectedAnalytics.recentVisits?.length > 0 ? (
                                                    <div className="space-y-2 md:space-y-3 max-h-64 overflow-y-auto">
                                                        {selectedAnalytics.recentVisits.map((visit, idx) => (
                                                            <div key={idx} className="border-l-4 border-indigo-200 pl-3 py-2">
                                                                <p className="font-medium text-xs md:text-sm">
                                                                    {visit.device} • {visit.browser}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {visit.city}, {visit.country}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {new Date(visit.visitedAt).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400 text-xs md:text-sm">No visits yet</p>
                                                )}
                                            </>
                                        )}

                                        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-xs text-gray-600">Original URL</p>
                                            <a
                                                href={selectedUrl.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs md:text-sm text-indigo-600 hover:underline break-all mt-1"
                                            >
                                                {selectedUrl.originalUrl}
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Geolocation, Device, and Browser Analytics */}
                {selectedAnalytics && selectedAnalytics.recentVisits?.length > 0 && (
                    <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Geographic Breakdown */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="text-indigo-600" size={20} />
                                <h3 className="font-semibold text-base md:text-lg">Top Cities</h3>
                            </div>
                            {geoData && geoData.length > 0 ? (
                                <div className="space-y-3">
                                    {geoData.map((geo, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <span className="text-xs md:text-sm text-gray-700">{geo.city}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 bg-gradient-to-r from-indigo-300 to-indigo-600 rounded" style={{ width: `${(geo.count / Math.max(...geoData.map(g => g.count))) * 60}px` }}></div>
                                                <span className="text-xs font-semibold text-gray-900 min-w-max">{geo.count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs">No geographic data available</p>
                            )}
                        </div>

                        {/* Device Breakdown */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Smartphone className="text-green-600" size={20} />
                                <h3 className="font-semibold text-base md:text-lg">Device Breakdown</h3>
                            </div>
                            {deviceData && deviceData.length > 0 ? (
                                <div>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={deviceData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, value }) => `${name}: ${value}`}
                                                    outerRadius={60}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {deviceData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {deviceData.map((device, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-xs md:text-sm">
                                                <span className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                                    {device.name}
                                                </span>
                                                <span className="font-semibold">{device.value} ({Math.round(device.value / deviceData.reduce((sum, d) => sum + d.value, 0) * 100)}%)</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs">No device data available</p>
                            )}
                        </div>

                        {/* Browser Breakdown */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="text-orange-600" size={20} />
                                <h3 className="font-semibold text-base md:text-lg">Top Browsers</h3>
                            </div>
                            {browserData && browserData.length > 0 ? (
                                <div className="space-y-3">
                                    {browserData.map((browser, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <span className="text-xs md:text-sm text-gray-700 truncate">{browser.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 bg-gradient-to-r from-orange-300 to-orange-600 rounded" style={{ width: `${(browser.value / Math.max(...browserData.map(b => b.value))) * 60}px` }}></div>
                                                <span className="text-xs font-semibold text-gray-900 min-w-max">{browser.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs">No browser data available</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Geographic Countries Breakdown */}
                {selectedAnalytics && selectedAnalytics.recentVisits?.length > 0 && (
                    <div className="mt-6 md:mt-8 bg-white rounded-2xl shadow-lg p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="text-purple-600" size={20} />
                            <h3 className="font-semibold text-base md:text-lg">Traffic by Country</h3>
                        </div>
                        {selectedAnalytics.recentVisits && selectedAnalytics.recentVisits.length > 0 ? (
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={(() => {
                                            const countryMap = {};
                                            selectedAnalytics.recentVisits.forEach(visit => {
                                                const country = visit.country || "Unknown";
                                                countryMap[country] = (countryMap[country] || 0) + 1;
                                            });
                                            return Object.entries(countryMap)
                                                .map(([country, count]) => ({ name: country, visits: count }))
                                                .sort((a, b) => b.visits - a.visits)
                                                .slice(0, 10);
                                        })()}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Bar dataKey="visits" fill="#a855f7" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-xs">No country data available</p>
                        )}
                    </div>
                )}

                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <p className="text-gray-400 text-lg">No analytics data available</p>
                        <p className="text-gray-400 text-sm mt-2">Create some shortened URLs to see analytics</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Analytics;