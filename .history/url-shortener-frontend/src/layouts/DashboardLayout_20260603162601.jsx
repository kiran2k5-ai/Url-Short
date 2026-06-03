import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
    return (
        className="min-h-screen bg-[#F8FAFC] flex"

            <Sidebar />

            <div className="flex-1">

                <Topbar />

                {children}

            </div>

        </div>
    );
}

export default DashboardLayout;