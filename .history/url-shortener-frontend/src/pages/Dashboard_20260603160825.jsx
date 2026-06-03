import DashboardLayout from "../layouts/DashboardLayout";
import {
    Link,
    MousePointerClick,
    BarChart3,
    Clock
} from "lucide-react";

function Dashboard() {

    return (
        <DashboardLayout>

            <div className="p-8">

                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage and monitor all your shortened links.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-10">

                    <div className="bg-white rounded-3xl p-6 shadow-lg">
                        <Link className="text-indigo-600" size={32} />
                        <h2 className="text-3xl font-bold mt-4">0</h2>
                        <p className="text-gray-500 mt-2">
                            Total URLs
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg">
                        <BarChart3 className="text-green-600" size={32} />
                        <h2 className="text-3xl font-bold mt-4">0</h2>
                        <p className="text-gray-500 mt-2">
                            Active URLs
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg">
                        <Clock className="text-red-500" size={32} />
                        <h2 className="text-3xl font-bold mt-4">0</h2>
                        <p className="text-gray-500 mt-2">
                            Expired URLs
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg">
                        <MousePointerClick
                            className="text-purple-600"
                            size={32}
                        />
                        <h2 className="text-3xl font-bold mt-4">0</h2>
                        <p className="text-gray-500 mt-2">
                            Total Clicks
                        </p>
                    </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-6 mt-10">

                    <div className="bg-white rounded-3xl p-6 shadow-lg h-96">

                        <h3 className="text-xl font-semibold mb-4">
                            Click Analytics
                        </h3>

                        <div className="h-full flex items-center justify-center text-gray-400">
                            Analytics Chart Here
                        </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg h-96">

                        <h3 className="text-xl font-semibold mb-4">
                            Recent Activity
                        </h3>

                        <div className="h-full flex items-center justify-center text-gray-400">
                            Recent URLs Here
                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;