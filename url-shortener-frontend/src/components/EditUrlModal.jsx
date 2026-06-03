import { useState, useEffect } from "react";
import { X, Copy, Check, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useData } from "../context/DataContext";

function EditUrlModal({ url, onClose, onSave }) {
    const { updateUrl } = useData();

    const [loading, setLoading] = useState(false);
    const [expiryType, setExpiryType] = useState("none");

    const [formData, setFormData] = useState({
        customAlias: url?.shortCode || "",
        expiryDays: "",
        expiryDate: ""
    });

    useEffect(() => {
        if (url?.expiryDate) {
            const expiryDate = new Date(url.expiryDate);
            const today = new Date();
            const diffTime = expiryDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 0) {
                setExpiryType("days");
                setFormData(prev => ({
                    ...prev,
                    expiryDays: diffDays.toString()
                }));
            }
        }
    }, [url]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleQuickExpiry = (days) => {
        setExpiryType("days");
        setFormData({
            ...formData,
            expiryDays: days.toString()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const payload = {};

            if (expiryType === "days" && formData.expiryDays) {
                payload.expiryDays = parseInt(formData.expiryDays);
            } else if (expiryType === "date" && formData.expiryDate) {
                payload.expiryDate = formData.expiryDate;
            }

            await updateUrl(url._id, payload);
            toast.success("URL updated successfully");
            onSave();
            onClose();

        } catch (error) {
            toast.error(error.message || "Failed to update URL");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold">
                    Edit URL
                </h2>

                <p className="text-gray-500 mt-2">
                    Update expiry settings for your link
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >
                    {/* Original URL (Read-only) */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-600">
                            Original URL
                        </label>
                        <div className="w-full h-14 px-4 border rounded-xl bg-gray-50 flex items-center text-gray-600 truncate">
                            {url?.originalUrl}
                        </div>
                    </div>

                    {/* Short Code (Read-only) */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-600">
                            Short Code
                        </label>
                        <div className="w-full h-14 px-4 border rounded-xl bg-gray-50 flex items-center font-mono text-indigo-600">
                            {url?.shortCode}
                        </div>
                    </div>

                    {/* Expiry Options */}
                    <div>
                        <label className="block mb-3 font-medium">
                            Update Expiry Settings
                        </label>

                        {/* Quick Options */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => handleQuickExpiry(1)}
                                className={`py-2 px-3 rounded-lg font-medium transition ${
                                    expiryType === "days" && formData.expiryDays === "1"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                1 Day
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickExpiry(7)}
                                className={`py-2 px-3 rounded-lg font-medium transition ${
                                    expiryType === "days" && formData.expiryDays === "7"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                7 Days
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickExpiry(30)}
                                className={`py-2 px-3 rounded-lg font-medium transition ${
                                    expiryType === "days" && formData.expiryDays === "30"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                30 Days
                            </button>
                        </div>

                        {/* Custom Days */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-600 mb-2 block">
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
                                className="w-full h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Calendar Date */}
                        <div>
                            <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
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
                                className="w-full h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50 transition"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUrlModal;
