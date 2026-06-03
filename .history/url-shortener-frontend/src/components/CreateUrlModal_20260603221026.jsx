import { useState } from "react";
import { X, Copy, Check, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useData } from "../context/DataContext";

function CreateUrlModal({ onClose }) {

    const { createUrl } = useData();

    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [result, setResult] = useState(null);
    const [expiryType, setExpiryType] = useState("none"); // none, days, date

    const [formData, setFormData] = useState({
        originalUrl: "",
        customAlias: "",
        expiryDays: "",
        expiryDate: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const quickExpiryOptions = [
        { label: "1 Day", days: 1 },
        { label: "7 Days", days: 7 },
        { label: "30 Days", days: 30 }
    ];

    const handleQuickExpiry = (days) => {
        setExpiryType("days");
        setFormData({
            ...formData,
            expiryDays: days.toString()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.originalUrl.trim()) {
            toast.error("Please enter an original URL");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                originalUrl: formData.originalUrl,
                customAlias: formData.customAlias || undefined,
            };

            if (expiryType === "days" && formData.expiryDays) {
                payload.expiryDays = parseInt(formData.expiryDays);
            } else if (expiryType === "date" && formData.expiryDate) {
                payload.expiryDate = formData.expiryDate;
            }

            const response = await createUrl(payload);
            setResult(response);
            toast.success("Short URL Created");
            
            setTimeout(() => {
                setFormData({ originalUrl: "", customAlias: "", expiryDays: "", expiryDate: "" });
                setResult(null);
                setExpiryType("none");
                onClose();
            }, 2000);

        } catch (error) {
            toast.error(
                error.message || "Failed to create URL"
            );
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!result?.shortUrl) return;
        navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold">
                    Create Short URL
                </h2>

                <p className="text-gray-500 mt-2">
                    Generate a short link instantly.
                </p>

                {!result ? (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 mt-8"
                    >
                        <div>
                            <label className="block mb-2 font-medium">
                                Original URL
                            </label>
                            <input
                                type="url"
                                name="originalUrl"
                                value={formData.originalUrl}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                required
                                className="w-full h-14 px-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Custom Alias (Optional)
                            </label>
                            <input
                                type="text"
                                name="customAlias"
                                value={formData.customAlias}
                                onChange={handleChange}
                                placeholder="my-link"
                                className="w-full h-14 px-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Expiry Days (Optional)
                            </label>
                            <input
                                type="number"
                                name="expiryDays"
                                value={formData.expiryDays}
                                onChange={handleChange}
                                placeholder="30"
                                min="1"
                                className="w-full h-14 px-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create URL"}
                        </button>
                    </form>
                ) : (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-semibold">
                            ✓ Generated URL
                        </h3>

                        <div className="mt-4 flex items-center gap-3">
                            <input
                                readOnly
                                value={result.shortUrl}
                                className="flex-1 h-12 px-4 border rounded-xl bg-gray-50"
                            />

                            <button
                                onClick={copyToClipboard}
                                className="h-12 px-5 bg-indigo-600 text-white rounded-xl flex items-center gap-2 hover:bg-indigo-700"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>

                        {result.qrCode && (
                            <div className="mt-8 text-center">
                                <h4 className="font-semibold mb-4">
                                    QR Code
                                </h4>
                                <img
                                    src={result.qrCode}
                                    alt="QR Code"
                                    className="w-48 h-48 mx-auto border rounded-2xl"
                                />
                            </div>
                        )}

                        <p className="mt-4 text-sm text-gray-500 text-center">
                            Closing automatically...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateUrlModal;