import { useState, useEffect } from "react";
import { Download, Copy, AlertCircle, Loader } from "lucide-react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function QRCodePage() {
    const { urls, loading } = useData();
    const [qrCodes, setQrCodes] = useState({});
    const [qrLoading, setQrLoading] = useState(false);

    useEffect(() => {
        const generateQRCodes = async () => {
            if (urls.length === 0) return;
            
            setQrLoading(true);
            const newQrCodes = {};
            
            for (const url of urls) {
                try {
                    const shortUrl = url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`;
                    // QR Server API generates a PNG image directly
                    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortUrl)}`;
                    newQrCodes[url._id] = qrApiUrl;
                } catch (error) {
                    console.error("Failed to generate QR code:", error);
                    toast.error(`Failed to generate QR for ${url.shortCode}`);
                }
            }
            setQrCodes(newQrCodes);
            setQrLoading(false);
        };

        generateQRCodes();
    }, [urls]);

    const downloadQRCode = (urlId, shortCode) => {
        const link = document.createElement("a");
        link.href = qrCodes[urlId];
        link.download = `qr-code-${shortCode}.png`;
        link.click();
        toast.success("QR Code downloaded");
    };

    const copyQRLink = (url) => {
        const shortUrl = url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`;
        navigator.clipboard.writeText(shortUrl);
        toast.success("Link copied to clipboard");
    };

    if (loading && urls.length === 0) {
        return (
            <DashboardLayout>
                <div className="p-6 md:p-8 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Loader className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
                        <p className="text-gray-600">Loading your links...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">QR Codes</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                        Download or share QR codes for your shortened URLs
                    </p>
                </div>

                {urls.length === 0 ? (
                    <div className="mt-6 md:mt-8 bg-white rounded-3xl shadow-lg p-8 text-center">
                        <div className="py-12 md:py-16">
                            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-lg text-gray-600 font-semibold">No QR Codes Available</p>
                            <p className="text-sm text-gray-500 mt-2">Create some shortened URLs first to see QR codes</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {qrLoading && (
                            <div className="mb-6 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <Loader className="w-4 h-4 animate-spin text-blue-600" />
                                <p className="text-sm text-blue-700">Generating QR codes...</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {urls.map((url) => {
                                const qrCode = qrCodes[url._id];
                                const shortUrl = url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`;
                                
                                return (
                                    <div
                                        key={url._id}
                                        className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center hover:shadow-xl hover:scale-105 transition transform duration-300"
                                    >
                                        {qrCode ? (
                                            <>
                                                <div className="w-full mb-4 bg-white p-2 rounded-lg border-2 border-indigo-200">
                                                    <img
                                                        src={qrCode}
                                                        alt={`QR Code for ${url.shortCode}`}
                                                        className="w-full"
                                                    />
                                                </div>
                                                
                                                <div className="w-full mb-4 text-center">
                                                    <p className="text-sm font-semibold text-gray-900 font-mono mb-1">
                                                        {url.shortCode}
                                                    </p>
                                                    <a
                                                        href={url.originalUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-indigo-600 hover:underline truncate block"
                                                        title={url.originalUrl}
                                                    >
                                                        {url.originalUrl.length > 40 
                                                            ? url.originalUrl.substring(0, 40) + '...' 
                                                            : url.originalUrl}
                                                    </a>
                                                    <p className="text-xs text-gray-500 mt-1 font-mono truncate">
                                                        {shortUrl.substring(0, 35)}...
                                                    </p>
                                                </div>

                                                <div className="w-full grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => downloadQRCode(url._id, url.shortCode)}
                                                        className="flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition text-xs font-medium hover:shadow-lg"
                                                        title="Download QR Code"
                                                    >
                                                        <Download size={14} />
                                                        <span className="hidden sm:inline">Download</span>
                                                    </button>
                                                    <button
                                                        onClick={() => copyQRLink(url)}
                                                        className="flex items-center justify-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 active:scale-95 transition text-xs font-medium hover:shadow-lg"
                                                        title="Copy short link"
                                                    >
                                                        <Copy size={14} />
                                                        <span className="hidden sm:inline">Copy Link</span>
                                                    </button>
                                                </div>

                                                <div className="w-full mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600 text-center font-mono">
                                                    Clicks: <span className="font-bold">{url.clickCount || 0}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <Loader className="w-6 h-6 animate-spin text-gray-400 mx-auto mb-2" />
                                                    <p className="text-xs text-gray-400">Generating...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}

export default QRCodePage;