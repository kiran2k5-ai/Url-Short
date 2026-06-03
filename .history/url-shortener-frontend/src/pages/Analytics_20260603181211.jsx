import AnalyticsChart from "../components/AnalyticsChart";

function Analytics() {

    return (
        <div className="p-8">

            <h1 className="text-5xl font-bold">
                Analytics
            </h1>

            <p className="text-gray-500 mt-2">
                Monitor traffic and performance
            </p>

            <div className="mt-8">
                <AnalyticsChart />
            </div>

        </div>
    );
}

export default Analytics;