import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentLinks from "../components/RecentLinks";

import {
    Link2,
    MousePointerClick,
    BarChart3,
    QrCode,
    TrendingUp
} from "lucide-react";

function Dashboard() {
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

                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
                        + Create Link
                    </button>

                </div>

                <div className="grid lg:grid-cols-5 gap-6 mt-10">

                <StatCard
                    title="TOTAL LINKS"
                    value="0"
                    subtitle="0 this month"
                    icon={<Link2 size={26} />}
                />

                <StatCard
                    title="TOTAL CLICKS"
                    value="0"
                    subtitle="All time"
                    icon={<MousePointerClick size={26} />}
                />

                <StatCard
                    title="ACTIVE LINKS"
                    value="0"
                    subtitle="Currently active"
                    icon={<BarChart3 size={26} />}
                />

                <StatCard
                    title="QR CODES"
                    value="0"
                    subtitle="Generated"
                    icon={<QrCode size={26} />}
                />

                <StatCard
                    title="GROWTH"
                    value="0%"
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

        </DashboardLayout>
    );
}

export default Dashboard;