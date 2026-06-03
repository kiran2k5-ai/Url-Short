import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
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
    TrendingUp
} from "lucide-react";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const { getDashboardStats, loading } = useData();
    const [stats, setStats] = useState({
        totalLinks: 0,
        activeLinks: 0,
        expiredLinks: 0,
        totalClicks: 0,
        qrCodesGenerated: 0,
        growth: 0,
    });

    useEffect(() => {
        const newStats = getDashboardStats();
        setStats(newStats);
    }, [getDashboardStats]);

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-5xl font-bold">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Monitor your links and performance
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-medium
                            transition-all
                            disabled:opacity-50
                        "
                        disabled={loading}
                    >
                        + Create Link
                    </button>
                </div>

                <div className="grid lg:grid-cols-5 gap-6 mt-10">
                    <StatCard
                        title="TOTAL LINKS"
                        value={stats.totalLinks.toString()}
                        subtitle={`${stats.activeLinks} active`}
                        icon={<Link2 size={26} />}
                    />

                    <StatCard
                        title="TOTAL CLICKS"
                        value={stats.totalClicks.toString()}
                        subtitle="All time"
                        icon={<MousePointerClick size={26} />}
                    />

                    <StatCard
                        title="ACTIVE LINKS"
                        value={stats.activeLinks.toString()}
                        subtitle={`${stats.expiredLinks} expired`}
                        icon={<BarChart3 size={26} />}
                    />

                    <StatCard
                        title="QR CODES"
                        value={stats.qrCodesGenerated.toString()}
                        subtitle="Generated"
                        icon={<QrCode size={26} />}
                    />

                    <StatCard
                        title="GROWTH"
                        value={`${stats.growth}%`}
                        subtitle="Month over month"
                        icon={<TrendingUp size={26} />}
                    />
                </div>

                <div className="mt-8">
                    <AnalyticsChart />
                </div>

                <div className="mt-8">
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