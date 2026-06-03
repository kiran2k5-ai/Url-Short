import { useState, useEffect } from "react";
import { X, Download, Copy } from "lucide-react";
import toast from "react-hot-toast";

function QRPreviewModal({ url, onClose }) {
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateQR = async () => {
            try {
                if (!url?.shortCode) return;
                
                // Use QR code API to generate QR code
                const shortUrl = url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`;
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shortUrl)}`;
                setQrCode(qrApiUrl);
            } catch (err) {
                console.error("Failed to generate QR code:", err);
                toast.error("Failed to generate QR code");
            } finally {
                setLoading(false);
            }
        };

        generateQR();
    }, [url]);

    const handleDownload = () => {
        if (!qrCode) return;
        
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = `qr-code-${url.shortCode}.png`;
        link.click();
        toast.success("QR Code downloaded");
    };

    const handleCopyQRLink = () => {
        const shortUrl = url.shortUrl || `https://url-short-caxa.onrender.com/${url.shortCode}`;
        navigator.clipboard.writeText(shortUrl);
        toast.success("Link copied to clipboard");
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative max-w-md w-full">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                    QR Code
                </h2>
                <p className="text-gray-500 mb-6 font-mono text-sm">
                    {url?.shortCode}
                </p>

                {loading ? (
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center">
                        <div className="animate-spin">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                ) : qrCode ? (
                    <div className="w-full bg-white p-4 rounded-2xl border-4 border-indigo-200 mb-6 shadow-lg">
                        <img src={qrCode} alt="QR Code" className="w-full" />
                    </div>
                ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                        Failed to load QR code
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={handleDownload}
                        disabled={!qrCode}
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <Download size={20} />
                        Download QR Code
                    </button>
                    
                    <button
                        onClick={handleCopyQRLink}
                        className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <Copy size={20} />
                        Copy Short Link
                    </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                        <strong>Short Link:</strong><br />
                        <code className="font-mono text-xs break-all text-blue-700">
                            {url?.shortUrl || `https://url-short-caxa.onrender.com/${url?.shortCode}`}
                        </code>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QRPreviewModal;
