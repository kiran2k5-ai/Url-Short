import { useState, useEffect } from "react";
import { Download, Copy } from "lucide-react";
import { useData } from "../context/DataContext";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function QRCodePage() {
    const { urls, loading } = useData();
    const [qrCodes, setQrCodes] = useState({});
    const [QRCodeLib, setQRCodeLib] = useState(null);

    useEffect(() => {
        const generateQRCodes = async () => {
            const newQrCodes = {};
            for (const url of urls) {
                try {
                    const qrDataUrl = await QRCode.toDataURL(
                        url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`
                    );
                    newQrCodes[url._id] = qrDataUrl;
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
            <div className="p-8">
                <div>
                    <h1 className="text-5xl font-bold">QR Codes</h1>
                    <p className="text-gray-500 mt-2">
                        Download or share QR codes for your shortened URLs
                    </p>
                </div>

                {urls.length === 0 ? (
                    <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-center text-gray-400 py-20">
                            <p className="text-lg">No QR Codes Available</p>
                            <p className="text-sm mt-2">Create some shortened URLs first</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {urls.map((url) => (
                            <div
                                key={url._id}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition"
                            >
                                {qrCodes[url._id] ? (
                                    <>
                                        <img
                                            src={qrCodes[url._id]}
                                            alt={`QR Code for ${url.shortCode}`}
                                            className="w-full max-w-xs border-2 border-gray-200 rounded-lg mb-4"
                                        />
                                        <div className="w-full mb-4">
                                            <p className="text-sm font-medium text-gray-700 truncate text-center">
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
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                                            >
                                                <Download size={16} />
                                                Download
                                            </button>
                                            <button
                                                onClick={() => copyQRImageToClipboard(url._id)}
                                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-400 text-sm">Generating...</p>
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