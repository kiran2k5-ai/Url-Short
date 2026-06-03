import { useLoading } from "../context/LoadingContext";

function PageLoader() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
                </div>

                {/* Text */}
                <div className="text-center">
                    <p className="text-white font-semibold text-lg">Loading</p>
                    <p className="text-white/60 text-sm mt-1">Please wait...</p>
                </div>

                {/* Animated dots */}
                <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                </div>
            </div>
        </div>
    );
}

export default PageLoader;
