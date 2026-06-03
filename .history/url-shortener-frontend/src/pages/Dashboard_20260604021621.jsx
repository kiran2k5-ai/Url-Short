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
    TrendingUp
} from "lucide-react";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const { getDashboardStats, loading } = useData();
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

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Dashboard
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                            Monitor your links and performance
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            px-4 md:px-6
                            py-2 md:py-3
                            rounded-xl
                            font-medium
                            text-sm md:text-base
                            transition-all
                            hover:shadow-lg
                            hover:scale-105
                            active:scale-95
                            disabled:opacity-50
                        "
                        disabled={loading}
                    >
                        + Create Link
                    </button>
                </div>

                <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-10">
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