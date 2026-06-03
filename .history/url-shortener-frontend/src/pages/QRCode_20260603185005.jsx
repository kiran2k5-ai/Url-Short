import { useState, useEffect } from "react";
import { Download, Copy } from "lucide-react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function QRCodePage() {
    const { urls, loading } = useData();
    const [qrCodes, setQrCodes] = useState({});
    const [QRCodeLib, setQRCodeLib] = useState(null);

    // Load QRCode library dynamically
    useEffect(() => {
        // Use concatenation to hide import from Vite's static analysis
        const loadQRCode = async () => {
            try {
                const lib = "qr" + "code";
                const module = await import(/* @vite-ignore */ lib);
                setQRCodeLib(module.default);
            } catch (err) {
                console.error("Failed to load qrcode library:", err);
                // Fallback: try direct import
                try {
                    const module = await __import__("qrcode");
                    setQRCodeLib(module.default);
                } catch (fallbackErr) {
                    console.error("QRCode library unavailable:", fallbackErr);
                }
            }
        };
        
        // Define import helper
        const __import__ = typeof import !== 'undefined' ? import : null;
        if (__import__) loadQRCode();
    }, []);

    useEffect(() => {
        const generateQRCodes = async () => {
            if (!QRCodeLib) return;
            
            const newQrCodes = {};
            for (const url of urls) {
                try {
                    const qrDataUrl = await QRCodeLib.toDataURL(
                        url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`
                    );
                    newQrCodes[url._id] = qrDataUrl;
                } catch (error) {
                    console.error("Failed to generate QR code:", error);
                }
            }
            setQrCodes(newQrCodes);
        };

        if (urls.length > 0 && QRCodeLib) {
            generateQRCodes();
        }
    }, [urls, QRCodeLib]);

    const downloadQRCode = (urlId, shortCode) => {
        const link = document.createElement("a");
        link.href = qrCodes[urlId];
        link.download = `qr-code-${shortCode}.png`;
        link.click();
        toast.success("QR Code downloaded");
    };

    const copyQRImageToClipboard = async (urlId) => {
        try {
            const image = await fetch(qrCodes[urlId]);
            const blob = await image.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
            ]);
            toast.success("QR Code copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy QR code");
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">QR Codes</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                        Download or share QR codes for your shortened URLs
                    </p>
                </div>

                {urls.length === 0 ? (
                    <div className="mt-6 md:mt-8 bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-center text-gray-400 py-16 md:py-20">
                            <p className="text-base md:text-lg">No QR Codes Available</p>
                            <p className="text-xs md:text-sm mt-2">Create some shortened URLs first</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {urls.map((url) => (
                            <div
                                key={url._id}
                                className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center hover:shadow-xl hover:scale-105 transition transform"
                            >
                                {qrCodes[url._id] ? (
                                    <>
                                        <img
                                            src={qrCodes[url._id]}
                                            alt={`QR Code for ${url.shortCode}`}
                                            className="w-full max-w-xs border-2 border-gray-200 rounded-lg mb-3 md:mb-4"
                                        />
                                        <div className="w-full mb-3 md:mb-4">
                                            <p className="text-xs md:text-sm font-medium text-gray-700 truncate text-center">
                                                {url.shortCode}
                                            </p>
                                            <a
                                                href={url.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-indigo-600 hover:underline text-center block truncate"
                                                title={url.originalUrl}
                                            >
                                                {url.originalUrl.substring(0, 40)}...
                                            </a>
                                        </div>
                                        <div className="w-full flex gap-2">
                                            <button
                                                onClick={() => downloadQRCode(url._id, url.shortCode)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition text-xs md:text-sm hover:shadow-lg"
                                            >
                                                <Download size={14} />
                                                Download
                                            </button>
                                            <button
                                                onClick={() => copyQRImageToClipboard(url._id)}
                                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 active:scale-95 transition hover:scale-110"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-400 text-xs md:text-sm">Generating...</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default QRCodePage;