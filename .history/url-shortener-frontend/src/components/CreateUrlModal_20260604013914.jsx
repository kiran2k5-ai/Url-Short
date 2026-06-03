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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto border border-gray-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Create Short URL
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                    Generate a short link instantly with advanced options.
                </p>

                {!result ? (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 mt-8"
                    >
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700 text-sm">
                                Original URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="originalUrl"
                                value={formData.originalUrl}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                required
                                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm hover:border-gray-300 transition"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700 text-sm">
                                Custom Alias <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="customAlias"
                                value={formData.customAlias}
                                onChange={handleChange}
                                placeholder="my-link"
                                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm hover:border-gray-300 transition"
                            />
                        </div>

                        <div>
                            <label className="block mb-3 font-semibold text-gray-700 text-sm">
                                Expiry Settings <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                            </label>

                            {/* Quick Options */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <button
                                    type="button"
                                    onClick={() => handleQuickExpiry(1)}
                                    className={`py-3 px-3 rounded-lg font-semibold text-sm transition shadow-sm border-2 ${
                                        expiryType === "days" && formData.expiryDays === "1"
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                                    }`}
                                >
                                    1 Day
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickExpiry(7)}
                                    className={`py-3 px-3 rounded-lg font-semibold text-sm transition shadow-sm border-2 ${
                                        expiryType === "days" && formData.expiryDays === "7"
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                                    }`}
                                >
                                    7 Days
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickExpiry(30)}
                                    className={`py-3 px-3 rounded-lg font-semibold text-sm transition shadow-sm border-2 ${
                                        expiryType === "days" && formData.expiryDays === "30"
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                                    }`}
                                >
                                    30 Days
                                </button>
                            </div>

                            {/* Custom Days */}
                            <div className="mb-4">
                                <label className="text-xs text-gray-600 mb-2 block font-medium">
                                    Custom Days
                                </label>
                                <input
                                    type="number"
                                    name="expiryDays"
                                    value={formData.expiryDays}
                                    onChange={(e) => {
                                        setExpiryType("days");
                                        handleChange(e);
                                    }}
                                    placeholder="Enter number of days"
                                    min="1"
                                    className="w-full h-11 px-4 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm hover:border-gray-300 transition"
                                />
                            </div>

                            {/* Calendar Date */}
                            <div>
                                <label className="text-xs text-gray-600 mb-2 block font-medium flex items-center gap-2">
                                    <Calendar size={16} />
                                    Specific Date
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={(e) => {
                                        setExpiryType("date");
                                        handleChange(e);
                                    }}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full h-11 px-4 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm hover:border-gray-300 transition"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create URL"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                            <Check size={24} className="text-green-500" />
                            Success!
                        </h3>

                        <div className="mt-6 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
                            <p className="text-xs text-gray-600 font-medium mb-2">Your Short URL</p>
                            <div className="flex items-center gap-3">
                                <input
                                    readOnly
                                    value={result.shortUrl}
                                    className="flex-1 h-12 px-4 border-2 border-indigo-300 rounded-lg bg-white font-mono font-semibold text-indigo-600"
                                />

                                <button
                                    onClick={copyToClipboard}
                                    className="h-12 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-indigo-800 font-semibold transition shadow-lg hover:shadow-xl"
                                >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        {result.qrCode && (
                            <div className="mt-8 text-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h4 className="font-semibold text-gray-700 mb-4 text-sm">
                                    QR Code
                                </h4>
                                <img
                                    src={result.qrCode}
                                    alt="QR Code"
                                    className="w-40 h-40 mx-auto border-2 border-indigo-200 rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        <p className="mt-6 text-xs text-gray-500 text-center">
                            Modal will close automatically in 2 seconds...
                        </p>
                        </div>

                        <p className="mt-6 text-xs text-gray-500 text-center">
                            Modal will close automatically in 2 seconds...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateUrlModal;