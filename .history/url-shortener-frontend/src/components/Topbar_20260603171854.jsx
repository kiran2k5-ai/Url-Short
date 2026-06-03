import {
    Search,
    Bell,
    Moon,
    Plus
} from "lucide-react";

function Topbar() {
    return (
        <div className="h-20 bg-white px-8 flex items-center justify-between shadow-sm">

            {/* Search Bar */}
            <div
                className="
                    w-[550px]
                    h-14
                    bg-white
                    rounded-2xl
                    flex
                    items-center
                    px-5
                    gap-3
                    shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)]
                    focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]
                    transition-all
                    duration-300
                "
            >
                <Search
                    size={20}
                    className="text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search links..."
                    className="
                        w-full
                        bg-transparent
                        outline-none
                        text-gray-700
                        placeholder:text-gray-400
                        text-lg
                    "
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">

                <button
                    className="
                        bg-indigo-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        flex
                        items-center
                        gap-2
                        shadow-lg
                        hover:scale-105
                        hover:bg-indigo-700
                        transition-all
                        duration-300
                    "
                >
                    <Plus size={18} />
                    Create Link
                </button>

                <button
                    className="
                        w-11
                        h-11
                        rounded-xl
                        bg-white
                        shadow-md
                        flex
                        items-center
                        justify-center
                        hover:scale-110
                        transition-all
                    "
                >
                    <Moon size={20} />
                </button>

                <button
                    className="
                        w-11
                        h-11
                        rounded-xl
                        bg-white
                        shadow-md
                        flex
                        items-center
                        justify-center
                        hover:scale-110
                        transition-all
                    "
                >
                    <Bell size={20} />
                </button>

                <div className="flex items-center gap-3 cursor-pointer">

                    <div
                        className="
                            w-11
                            h-11
                            rounded-full
                            bg-indigo-100
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-indigo-600
                            shadow-md
                        "
                    >
                        K
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900">
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