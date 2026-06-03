import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentLinks from "../components/RecentLinks";



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
                    />

                    <StatCard
                        title="TOTAL CLICKS"
                        value="0"
                    />

                    <StatCard
                        title="ACTIVE LINKS"
                        value="0"
                    />

                    <StatCard
                        title="QR CODES"
                        value="0"
                    />

                    <StatCard
                        title="GROWTH"
                        value="0%"
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