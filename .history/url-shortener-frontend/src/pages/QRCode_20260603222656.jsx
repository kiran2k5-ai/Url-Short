import { useState, useEffect } from "react";
import { Download, Copy, Loader } from "lucide-react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function QRCodePage() {
    const { urls, loading } = useData();
    const [qrCodes, setQrCodes] = useState({});

    // Generate QR codes using QR Server API
    useEffect(() => {
        const generateQRCodes = async () => {
            const newQrCodes = {};
            for (const url of urls) {
                try {
                    const shortUrl = url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`;
                    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortUrl)}`;
                    newQrCodes[url._id] = qrApiUrl;
                } catch (error) {
                    console.error("Failed to generate QR code:", error);
                }
            }
            setQrCodes(newQrCodes);
        };

        if (urls.length > 0) {
            generateQRCodes();
        }
    }, [urls]);

    const downloadQRCode = (urlId, shortCode) => {
        const link = document.createElement("a");
        link.href = qrCodes[urlId];
        link.download = `qr-code-${shortCode}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("QR Code downloaded");
    };

    const copyQRToClipboard = async (shortCode) => {
        try {
            const qrUrl = qrCodes[urls.find(u => u.shortCode === shortCode)?._id];
            if (!qrUrl) {
                toast.error("QR code not found");
                return;
            }
            const fullUrl = `https://url-short-caxa.onrender.com/${shortCode}`;
            await navigator.clipboard.writeText(fullUrl);
            toast.success("Link copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">QR Codes</h1>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                        Download or share QR codes for your shortened URLs
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader className="animate-spin text-indigo-600" size={32} />
                    </div>
                ) : urls.length === 0 ? (
                    <div className="mt-6 md:mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-lg p-12 text-center">
                        <div className="py-12">
                            <div className="text-6xl mb-4">📱</div>
                            <p className="text-lg font-semibold text-gray-900">No QR Codes Available</p>
                            <p className="text-gray-600 mt-2">Create some shortened URLs first to generate QR codes</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {urls.map((url) => (
                            <div
                                key={url._id}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl hover:scale-105 transition transform duration-300 border border-gray-100"
                            >
                                {qrCodes[url._id] ? (
                                    <>
                                        <div className="w-full mb-4 flex justify-center">
                                            <img
                                                src={qrCodes[url._id]}
                                                alt={`QR Code for ${url.shortCode}`}
                                                className="w-48 h-48 border-2 border-indigo-200 rounded-xl object-cover p-2 bg-white"
                                            />
                                        </div>
                                        <div className="w-full mb-4 text-center border-t border-b py-3">
                                            <p className="text-sm font-bold text-gray-900 bg-indigo-50 inline-block px-3 py-1 rounded-full">
                                                {url.shortCode}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-2 truncate px-2 flex-1">
                                                {url.originalUrl}
                                            </p>
                                        </div>
                                        <div className="w-full flex gap-2">
                                            <button
                                                onClick={() => downloadQRCode(url._id, url.shortCode)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition text-sm hover:shadow-lg"
                                            >
                                                <Download size={16} />
                                                Download
                                            </button>
                                            <button
                                                onClick={() => copyQRToClipboard(url.shortCode)}
                                                className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 active:scale-95 transition hover:scale-110 font-medium"
                                                title="Copy short link"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center animate-pulse">
                                        <Loader className="text-gray-400 animate-spin" size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );

export default QRCodePage;