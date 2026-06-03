import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 flex">

            <Sidebar />

            <div className="flex-1">

                <Topbar />

                {children}

            </div>

        </div>
    );
}

export default DashboardLayout;