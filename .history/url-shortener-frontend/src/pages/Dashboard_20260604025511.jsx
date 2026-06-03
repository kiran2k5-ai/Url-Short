import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useLoading } from "../context/LoadingContext";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentLinks from "../components/RecentLinks";
import CreateUrlModal from "../components/CreateUrlModal";

import {
    Link2,
    MousePointerClick,
    BarChart3,
    QrCode,
    TrendingUp,
    ArrowUpRight,
    Clock,
    CheckCircle2
} from "lucide-react";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const { getDashboardStats, loading, urls } = useData();
    const { setIsLoading } = useLoading();
    const [stats, setStats] = useState({
        totalLinks: 0,
        activeLinks: 0,
        expiredLinks: 0,
        totalClicks: 0,
        qrCodesGenerated: 0,
        growth: 0,
    });

    useEffect(() => {
        setIsLoading(true);
        const newStats = getDashboardStats();
        setStats(newStats);
        setTimeout(() => setIsLoading(false), 500);
    }, [getDashboardStats, setIsLoading]);

    const recentClicks = urls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    const activeCount = urls.filter(url => !url.expiryDate || new Date(url.expiryDate) > new Date()).length;

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg">
                            Welcome back! Here's your link performance overview.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="
                            bg-gradient-to-r from-indigo-600 to-indigo-700
                            hover:from-indigo-700 hover:to-indigo-800
                            text-white
                            px-6 md:px-8
                            py-3 md:py-4
                            rounded-xl
                            font-semibold
                            text-base
                            transition-all
                            hover:shadow-lg
                            hover:shadow-indigo-500/40
                            hover:scale-105
                            active:scale-95
                            disabled:opacity-50
                            shadow-lg
                            flex items-center gap-2
                            whitespace-nowrap
                        "
                        disabled={loading}
                    >
                        <span>+ Create Link</span>
                    </button>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <StatCard
                        title="TOTAL LINKS"
                        value={stats.totalLinks.toString()}
                        subtitle={`${activeCount} active`}
                        icon={<Link2 size={28} />}
                        color="from-blue-400 to-blue-600"
                    />

                    <StatCard
                        title="TOTAL CLICKS"
                        value={recentClicks.toLocaleString()}
                        subtitle="All time"
                        icon={<MousePointerClick size={28} />}
                        color="from-green-400 to-green-600"
                    />

                    <StatCard
                        title="ACTIVE LINKS"
                        value={activeCount.toString()}
                        subtitle={`${stats.expiredLinks} expired`}
                        icon={<CheckCircle2 size={28} />}
                        color="from-purple-400 to-purple-600"
                    />

                    <StatCard
                        title="QR CODES"
                        value={stats.qrCodesGenerated.toString()}
                        subtitle="Generated"
                        icon={<QrCode size={28} />}
                        color="from-orange-400 to-orange-600"
                    />

                    <StatCard
                        title="GROWTH"
                        value={`${stats.growth}%`}
                        subtitle="Month over month"
                        icon={<TrendingUp size={28} />}
                        color="from-pink-400 to-pink-600"
                    />
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Today's Clicks</p>
                                <p className="text-3xl font-bold text-indigo-600 mt-2">{Math.floor(recentClicks * 0.1)}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <ArrowUpRight className="text-indigo-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Avg Clicks/Link</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    {stats.totalLinks > 0 ? Math.round(recentClicks / stats.totalLinks) : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <BarChart3 className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Expiring Soon</p>
                                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.expiredLinks}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Recent Links */}
                <div className="space-y-8">
                    <AnalyticsChart />
                    <RecentLinks />
                </div>
            </div>

            {showModal && (
                <CreateUrlModal
                    onClose={() => setShowModal(false)}
                />
            )}
        </DashboardLayout>
    );
}

export default Dashboard;