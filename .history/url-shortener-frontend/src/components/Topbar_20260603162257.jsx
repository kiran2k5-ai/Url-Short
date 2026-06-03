import {
    Search,
    Bell,
    Moon,
    Plus
} from "lucide-react";

function Topbar() {
    return (
        <div className="h-20 bg-white border-b px-8 flex items-center justify-between">

            <div className="relative w-[550px]">

                <Search
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search links..."
                    className="w-full h-12 pl-12 rounded-xl border outline-none"
                />

            </div>

            <div className="flex items-center gap-6">

                <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
                    <Plus size={18} />
                    Create Link
                </button>

                <Moon size={22} />

                <Bell size={22} />

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                        K
                    </div>

                    <div>
                        <p className="font-semibold">
                            KIRAN P
                        </p>

                        <p className="text-sm text-gray-500">
                            Free
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Topbar;