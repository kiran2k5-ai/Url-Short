import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

function QRPreviewModal({ url, onClose }) {
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateQR = async () => {
            try {
                if (!url?.shortUrl) return;
                
                // Use QR code API to generate QR code
                // QR Server is a free, open-source QR code generator
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url.shortUrl)}`;
                setQrCode(qrApiUrl);
            } catch (err) {
                console.error("Failed to generate QR code:", err);
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
        link.download = `qr-${url.shortCode}.png`;
        link.click();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative max-w-md w-full">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-2">
                    QR Code
                </h2>
                <p className="text-gray-500 mb-6">
                    {url?.shortCode}
                </p>

                {loading ? (
                    <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                        <div className="animate-spin">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                ) : qrCode ? (
                    <div className="w-full bg-white p-4 rounded-2xl border-2 border-indigo-200 mb-6">
                        <img src={qrCode} alt="QR Code" className="w-full" />
                    </div>
                ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                        Failed to load QR code
                    </div>
                )}

                <button
                    onClick={handleDownload}
                    disabled={!qrCode}
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                    <Download size={18} />
                    Download QR Code
                </button>
            </div>
        </div>
    );
}

export default QRPreviewModal;
